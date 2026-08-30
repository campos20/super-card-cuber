import { useEffect, useRef, useState, type RefObject } from "react";
import {
  copyCardImageToClipboard,
  downloadCardImage,
} from "../lib/export.util";
import "./CardActions.css";

interface Props {
  cardRef: RefObject<HTMLDivElement | null>;
  fileName: string;
}

type ActionState = "idle" | "busy" | "done" | "error";

const IDLE_LABELS = { copy: "📋 Copy image", download: "⬇️ Download PNG" };

export const CardActions = ({ cardRef, fileName }: Props) => {
  const [copyState, setCopyState] = useState<ActionState>("idle");
  const [downloadState, setDownloadState] = useState<ActionState>("idle");
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const downloadResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // These refs hold a timer id, not a DOM node — reading the latest
    // .current on unmount (rather than a stale snapshot) is what we want.
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (downloadResetTimer.current) clearTimeout(downloadResetTimer.current);
    };
  }, []);

  const run = async (
    setState: (state: ActionState) => void,
    resetTimer: RefObject<ReturnType<typeof setTimeout> | null>,
    action: (node: HTMLDivElement) => Promise<void>,
  ) => {
    const node = cardRef.current;
    if (!node) return;

    if (resetTimer.current) clearTimeout(resetTimer.current);
    setState("busy");
    try {
      await action(node);
      setState("done");
    } catch {
      setState("error");
    } finally {
      resetTimer.current = setTimeout(() => setState("idle"), 2000);
    }
  };

  return (
    <div className="ca">
      <button
        type="button"
        className="ca__btn"
        disabled={copyState === "busy"}
        onClick={() =>
          run(setCopyState, copyResetTimer, copyCardImageToClipboard)
        }
      >
        {copyState === "busy"
          ? "Copying…"
          : copyState === "done"
            ? "Copied ✓"
            : copyState === "error"
              ? "Couldn't copy"
              : IDLE_LABELS.copy}
      </button>
      <button
        type="button"
        className="ca__btn"
        disabled={downloadState === "busy"}
        onClick={() =>
          run(setDownloadState, downloadResetTimer, (node) =>
            downloadCardImage(node, fileName),
          )
        }
      >
        {downloadState === "busy"
          ? "Exporting…"
          : downloadState === "done"
            ? "Saved ✓"
            : downloadState === "error"
              ? "Couldn't export"
              : IDLE_LABELS.download}
      </button>
    </div>
  );
};
