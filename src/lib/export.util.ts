import { toBlob } from "html-to-image";

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

// html-to-image only auto-embeds @font-face rules it can prove are used by a
// real DOM node's computed style — it misses the @cubing/icons font, which is
// only ever applied through a `::before` pseudo-element. It also can't fetch
// external font *files* from within the SVG it renders (an <img>-loaded SVG
// can't pull in further subresources), so a plain remote url() isn't enough
// either — each font file has to be inlined as a data URI ourselves.
const FONT_STYLESHEETS = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",
  "https://cdn.cubing.net/v0/css/@cubing/icons/css",
];

const embedFontFaceUrls = async (
  cssText: string,
  baseUrl: string,
): Promise<string> => {
  const urlPattern = /url\((['"]?)([^'")]+)\1\)/g;
  const relativeUrls = new Set(
    Array.from(cssText.matchAll(urlPattern), (m) => m[2]).filter(
      (url) => !url.startsWith("data:"),
    ),
  );

  const dataUrlByRelativeUrl = new Map<string, string>();
  await Promise.all(
    Array.from(relativeUrls, async (relativeUrl) => {
      try {
        const absoluteUrl = new URL(relativeUrl, baseUrl).href;
        const blob = await fetch(absoluteUrl).then((res) => res.blob());
        dataUrlByRelativeUrl.set(relativeUrl, await blobToDataUrl(blob));
      } catch {
        // Leave this url() unresolved — that font just won't render in the
        // export, but the rest of the capture shouldn't be blocked by it.
      }
    }),
  );

  return cssText.replace(urlPattern, (match, quote: string, url: string) => {
    const dataUrl = dataUrlByRelativeUrl.get(url);
    return dataUrl ? `url(${quote}${dataUrl}${quote})` : match;
  });
};

let fontEmbedCssPromise: Promise<string> | null = null;

const getFontEmbedCss = (): Promise<string> => {
  fontEmbedCssPromise ??= Promise.all(
    FONT_STYLESHEETS.map((url) =>
      fetch(url)
        .then((res) => res.text())
        .then((text) => embedFontFaceUrls(text, url)),
    ),
  ).then((sheets) => sheets.join("\n"));
  return fontEmbedCssPromise;
};

// avatars.worldcubeassociation.org doesn't send CORS headers, so drawing the
// avatar straight into a canvas taints it and blocks reading the result back
// out (toBlob/toDataURL throw). Routing through a CORS-passthrough image
// proxy lets us fetch it as a same-permission blob first.
const corsProxiedUrl = (url: string): string => {
  const withoutProtocol = url.replace(/^https?:\/\//, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(withoutProtocol)}`;
};

// Temporarily swaps cross-origin <img> sources inside `node` for CORS-safe
// data URLs so html-to-image can inline them without tainting the canvas,
// then restores the originals once `run` settles.
const withCorsSafeImages = async <T>(
  node: HTMLElement,
  run: () => Promise<T>,
): Promise<T> => {
  const images = Array.from(node.querySelectorAll("img"));
  const originalSrcs = images.map((img) => img.src);

  await Promise.all(
    images.map(async (img) => {
      try {
        const response = await fetch(corsProxiedUrl(img.src));
        const blob = await response.blob();
        img.src = await blobToDataUrl(blob);
      } catch {
        // Leave the original src — export may fail to include this image,
        // but a proxy hiccup shouldn't block the rest of the capture.
      }
    }),
  );

  try {
    return await run();
  } finally {
    images.forEach((img, i) => {
      img.src = originalSrcs[i];
    });
  }
};

export const captureCardImage = (node: HTMLElement): Promise<Blob> =>
  withCorsSafeImages(node, async () => {
    const fontEmbedCSS = await getFontEmbedCss();
    const blob = await toBlob(node, {
      pixelRatio: 2,
      cacheBust: true,
      fontEmbedCSS,
    });
    if (!blob) throw new Error("Failed to generate card image");
    return blob;
  });

export const downloadCardImage = async (
  node: HTMLElement,
  fileName: string,
): Promise<void> => {
  const blob = await captureCardImage(node);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

export const copyCardImageToClipboard = async (
  node: HTMLElement,
): Promise<void> => {
  // Pass the promise (not an awaited blob) so Safari can keep the clipboard
  // write tied to the originating user gesture while the capture runs.
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": captureCardImage(node) }),
  ]);
};
