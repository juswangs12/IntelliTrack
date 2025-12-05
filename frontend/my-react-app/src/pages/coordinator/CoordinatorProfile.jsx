import { Mail, Phone, User as UserIcon, Building } from 'lucide-react';

export function CoordinatorProfile({ user }) {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="page-description">View and manage your profile information</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Personal Information</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #800020, #9a1c34)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <UserIcon className="w-16 h-16 text-white" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {user.name}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Coordinator/Adviser</p>
              <button className="btn btn-secondary">Edit Profile</button>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={user.name}
                className="form-input"
                readOnly
              />
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail className="w-5 h-5" style={{ color: '#6b7280' }} />
                <input
                  type="email"
                  value={user.email}
                  className="form-input"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="form-label">Phone Number</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone className="w-5 h-5" style={{ color: '#6b7280' }} />
                <input
                  type="tel"
                  value="+1 (555) 123-4567"
                  className="form-input"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="form-label">Department</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building className="w-5 h-5" style={{ color: '#6b7280' }} />
                <input
                  type="text"
                  value="Computer Science Department"
                  className="form-input"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="form-label">Position</label>
              <input
                type="text"
                value="Associate Professor"
                className="form-input"
                readOnly
              />
            </div>

            <div>
              <label className="form-label">Office Location</label>
              <input
                type="text"
                value="Room 305, Engineering Building"
                className="form-input"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Specialization & Expertise</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label className="form-label">Research Areas</label>
              <textarea
                rows="3"
                value="Software Engineering&#10;Web Development&#10;Database Systems"
                className="form-input"
                style={{ resize: 'vertical' }}
                readOnly
              />
            </div>

            <div>
              <label className="form-label">Years of Experience</label>
              <input
                type="text"
                value="15 years"
                className="form-input"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
