import { beforeEach, describe, expect, it } from "vitest";
import {
  createTemplateId,
  loadCustomTemplates,
  saveCustomTemplates,
  type Template,
} from "./templates";

const sampleTemplate: Template = {
  id: "abc123",
  name: "My Poster",
  layout: "poster",
  builtin: false,
  hiddenStats: ["records"],
  hiddenEvents: ["444", "555"],
  showIcons: true,
};

describe("custom template storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty list when nothing has been saved", () => {
    expect(loadCustomTemplates()).toEqual([]);
  });

  it("round-trips saved templates through localStorage", () => {
    saveCustomTemplates([sampleTemplate]);
    expect(loadCustomTemplates()).toEqual([sampleTemplate]);
  });

  it("falls back to an empty list for corrupt stored data", () => {
    localStorage.setItem("scc-custom-templates", "{ not valid json");
    expect(loadCustomTemplates()).toEqual([]);
  });

  it("falls back to an empty list when the stored value isn't an array", () => {
    localStorage.setItem("scc-custom-templates", JSON.stringify({ oops: 1 }));
    expect(loadCustomTemplates()).toEqual([]);
  });
});

describe("createTemplateId", () => {
  it("generates distinct, non-empty ids", () => {
    const first = createTemplateId();
    const second = createTemplateId();
    expect(first).not.toBe(second);
    expect(first.length).toBeGreaterThan(0);
    expect(second.length).toBeGreaterThan(0);
  });
});
