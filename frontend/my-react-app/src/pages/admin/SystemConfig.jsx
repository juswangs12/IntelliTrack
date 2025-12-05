import { Settings as SettingsIcon, Save } from 'lucide-react';

export function SystemConfig() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">System Configuration</h1>
        <p className="page-description">Configure system-wide settings</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Academic Year Settings</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label className="form-label">Current Academic Year</label>
              <input
                type="text"
                value="2025-2026"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Semester</label>
              <select className="form-select">
                <option>First Semester</option>
                <option>Second Semester</option>
                <option>Summer</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{ width: 'fit-content' }}>
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Grading Rubrics</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label className="form-label">Proposal Weight (%)</label>
              <input
                type="number"
                value="20"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">SRS Weight (%)</label>
              <input
                type="number"
                value="25"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">SDD Weight (%)</label>
              <input
                type="number"
                value="25"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Final Defense Weight (%)</label>
              <input
                type="number"
                value="30"
                className="form-input"
              />
            </div>
            <button className="btn btn-primary" style={{ width: 'fit-content' }}>
              <Save className="w-4 h-4" />
              Save Rubric
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Notification Settings</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              <span>Email notifications for new submissions</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              <span>Deadline reminders (3 days before)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              <span>Send daily digest to advisers</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" />
              <span>SMS notifications for urgent matters</span>
            </label>
            <button className="btn btn-primary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
