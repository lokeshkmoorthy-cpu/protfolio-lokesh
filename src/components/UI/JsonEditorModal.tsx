import React, { useEffect, useRef, useState } from 'react';

type Props = {
  open: boolean;
  title: string;
  initial: any;
  onSave: (value: any) => void;
  onClose: () => void;
};

const JsonEditorModal: React.FC<Props> = ({ open, title, initial, onSave, onClose }) => {
  const [text, setText] = useState(() => JSON.stringify(initial ?? {}, null, 2));
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setText(JSON.stringify(initial ?? {}, null, 2));
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
    try {
      const parsed = JSON.parse(text);
      onSave(parsed);
    } catch {
      alert('Invalid JSON. Please fix and try again.');
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h4>Edit {title}</h4>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="modal-textarea"
          rows={14}
        />
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default JsonEditorModal;
