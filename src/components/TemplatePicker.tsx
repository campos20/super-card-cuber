import { useState, type FormEvent } from "react";
import type { Template } from "../lib/templates";
import "./TemplatePicker.css";

interface Props {
  templates: Template[];
  activeTemplateId: string;
  onSelect: (template: Template) => void;
  onCreate: (name: string) => void;
  onDelete: (id: string) => void;
}

export const TemplatePicker = ({
  templates,
  activeTemplateId,
  onSelect,
  onCreate,
  onDelete,
}: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [draftName, setDraftName] = useState("");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const name = draftName.trim();
    if (!name) return;
    onCreate(name);
    setDraftName("");
    setIsCreating(false);
  };

  return (
    <div className="tp">
      <span className="tp__label">Template</span>
      <div className="tp__row">
        {templates.map((template) => (
          <span
            key={template.id}
            className={`tp__chip ${template.id === activeTemplateId ? "tp__chip--active" : ""}`}
          >
            <button
              type="button"
              className="tp__chip-select"
              onClick={() => onSelect(template)}
            >
              <span
                className={`tp__icon tp__icon--${template.layout}`}
                aria-hidden="true"
              />
              {template.name}
            </button>
            {!template.builtin && (
              <button
                type="button"
                className="tp__delete"
                aria-label={`Delete ${template.name} template`}
                onClick={() => onDelete(template.id)}
              >
                ×
              </button>
            )}
          </span>
        ))}

        {isCreating ? (
          <form className="tp__create-form" onSubmit={handleSave}>
            <input
              autoFocus
              className="tp__create-input"
              placeholder="Template name"
              maxLength={24}
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onBlur={() => {
                if (!draftName.trim()) setIsCreating(false);
              }}
            />
            <button type="submit" className="tp__create-save">
              Save
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="tp__chip tp__chip--new"
            onClick={() => setIsCreating(true)}
          >
            + Save current
          </button>
        )}
      </div>
    </div>
  );
};
