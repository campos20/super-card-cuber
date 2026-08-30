import { useState, type RefObject } from "react";
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

  const run = async (
    setState: (state: ActionState) => void,
    action: (node: HTMLDivElement) => Promise<void>,
  ) => {
    const node = cardRef.current;
    if (!node) return;
    setState("busy");
    try {
      await action(node);
      setState("done");
    } catch {
      setState("error");
    } finally {
      setTimeout(() => setState("idle"), 2000);
    }
  };

  return (
    <div className="ca">
      <button
        type="button"
        className="ca__btn"
        disabled={copyState === "busy"}
        onClick={() => run(setCopyState, copyCardImageToClipboard)}
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
          run(setDownloadState, (node) => downloadCardImage(node, fileName))
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
