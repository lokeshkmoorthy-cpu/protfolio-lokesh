import React, { useEffect, useRef, useState } from 'react';

type Field = { label: string; path: string; type?: 'text' | 'number' };

type Props = {
  open: boolean;
  title: string;
  initial: any;
  onSave: (value: any) => void;
  onClose: () => void;
  /** Optional schema to render friendly inputs. If omitted, raw JSON textarea is shown. */
  fields?: Field[];
};

const JsonEditorModal: React.FC<Props> = ({ open, title, initial, onSave, onClose, fields }) => {
  const [text, setText] = useState(() => JSON.stringify(initial ?? {}, null, 2));
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [formState, setFormState] = useState<Record<string, any>>({});

  useEffect(() => {
    if (open) {
      setText(JSON.stringify(initial ?? {}, null, 2));
      setFormState(initial ?? {});
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [open, initial]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  const handleSave = () => {
    // If fields provided, save from formState; else from JSON textarea
    if (fields && fields.length) {
      onSave(formState);
      return;
    }
    try {
      const parsed = JSON.parse(text);
      onSave(parsed);
    } catch {
      alert('Invalid JSON. Please fix and try again.');
    }
  };

  const updatePath = (path: string, value: any) => {
    const parts = path.split('.');
    const next = { ...formState };
    let cursor: any = next;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const key = parts[i];
      cursor[key] = cursor[key] ?? {};
      cursor = cursor[key];
    }
    cursor[parts[parts.length - 1]] = value;
    setFormState(next);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h4>Edit {title}</h4>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        {fields && fields.length ? (
          <div className="modal-form-grid">
            {fields.map((f) => (
              <label key={f.path} className="modal-field">
                <span>{f.label}</span>
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={
                    f.path
                      .split('.')
                      .reduce<any>((acc, key) => (acc ? acc[key] : ''), formState) ?? ''
                  }
                  onChange={(e) =>
                    updatePath(
                      f.path,
                      f.type === 'number' ? Number(e.target.value) : e.target.value
                    )
                  }
                />
              </label>
            ))}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="modal-textarea"
            rows={14}
          />
        )}
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default JsonEditorModal;
