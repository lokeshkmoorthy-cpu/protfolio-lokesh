import React from 'react';

export type AdminPanelProps = {
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  saving: boolean;
  status: string | null;
  onEditHero: () => void;
  onEditAbout: () => void;
  onEditResume: () => void;
  onEditSkills: () => void;
  onEditPortfolio: () => void;
  onEditContact: () => void;
  onAddSkill: () => void;
  onAddProject: () => void;
  onReload: () => void;
};

const AdminPanel: React.FC<AdminPanelProps> = ({
  editMode,
  setEditMode,
  saving,
  status,
  onEditHero,
  onEditAbout,
  onEditResume,
  onEditSkills,
  onEditPortfolio,
  onEditContact,
  onAddSkill,
  onAddProject,
  onReload,
}) => {
  return (
    <div className="admin-panel">
      <button
        className="admin-toggle"
        onClick={() => setEditMode(!editMode)}
        aria-expanded={editMode}
      >
        <span className="dot" />
        Admin
        <i className={`bi ${editMode ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
      </button>

      <div className={`admin-dropdown ${editMode ? 'open' : ''}`}>
        <div className="admin-header">
          <span className="admin-status">
            {saving ? 'Saving…' : status || 'Idle'}
          </span>
          <button onClick={onReload} className="admin-btn ghost">⏳</button>
        </div>

        <div className="admin-grid">
          <button onClick={onEditHero} className="admin-btn">Edit Hero</button>
          <button onClick={onEditAbout} className="admin-btn">Edit About</button>
          <button onClick={onEditResume} className="admin-btn">Edit Resume</button>
          <button onClick={onEditSkills} className="admin-btn">Edit Skills</button>
          <button onClick={onAddSkill} className="admin-btn ghost">Add Skill</button>
          <button onClick={onEditPortfolio} className="admin-btn">Edit Portfolio</button>
          <button onClick={onAddProject} className="admin-btn ghost">Add Project</button>
          <button onClick={onEditContact} className="admin-btn">Edit Contact</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
