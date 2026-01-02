import { useState } from 'react';
import { Users, Plus, Edit, Trash2, UserPlus, Search } from 'lucide-react';

export function GroupManagement() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Group Alpha',
      members: [
        { id: 1, name: 'Juan Dela Cruz', studentId: '2021-00001' },
        { id: 2, name: 'Maria Santos', studentId: '2021-00002' },
        { id: 3, name: 'Pedro Garcia', studentId: '2021-00003' }
      ],
      adviser: 'Dr. Maria Garcia',
      project: 'IoT Smart Home System',
      createdDate: '2025-09-01'
    },
    {
      id: 2,
      name: 'Group Beta',
      members: [
        { id: 4, name: 'Ana Lopez', studentId: '2021-00004' },
        { id: 5, name: 'Carlos Reyes', studentId: '2021-00005' }
      ],
      adviser: 'Dr. John Smith',
      project: 'E-Commerce Platform',
      createdDate: '2025-09-05'
    },
    {
      id: 3,
      name: 'Group Gamma',
      members: [
        { id: 6, name: 'Sofia Martinez', studentId: '2021-00006' },
        { id: 7, name: 'Diego Fernandez', studentId: '2021-00007' },
        { id: 8, name: 'Isabella Cruz', studentId: '2021-00008' }
      ],
      adviser: 'Dr. Robert Lee',
      project: 'Mobile Health Tracker',
      createdDate: '2025-09-10'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroup, setNewGroup] = useState({
    name: '',
    project: '',
    adviser: ''
  });

  const availableStudents = [
    { id: 9, name: 'Luis Hernandez', studentId: '2021-00009' },
    { id: 10, name: 'Carmen Diaz', studentId: '2021-00010' },
    { id: 11, name: 'Miguel Torres', studentId: '2021-00011' },
    { id: 12, name: 'Elena Rodriguez', studentId: '2021-00012' }
  ];

  const availableAdvisers = [
    'Dr. Maria Garcia',
    'Dr. John Smith',
    'Dr. Robert Lee',
    'Dr. Sarah Johnson',
    'Dr. Michael Brown'
  ];

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.project && newGroup.adviser) {
      const group = {
        id: groups.length + 1,
        ...newGroup,
        members: [],
        createdDate: new Date().toISOString().split('T')[0]
      };
      setGroups([...groups, group]);
      setNewGroup({ name: '', project: '', adviser: '' });
      setShowCreateModal(false);
    }
  };

  const handleDeleteGroup = (groupId) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      setGroups(groups.filter(g => g.id !== groupId));
    }
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setShowEditModal(true);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.adviser.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Group Management</h1>
        <p className="page-description">Create and manage student groups for capstone projects</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon maroon">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Groups</p>
            <p className="stat-value">{groups.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Students</p>
            <p className="stat-value">{groups.reduce((sum, g) => sum + g.members.length, 0)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <UserPlus className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Unassigned Students</p>
            <p className="stat-value">{availableStudents.length}</p>
          </div>
        </div>
      </div>

      {/* Search and Create */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-content">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search className="w-5 h-5" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="Search groups by name, project, or adviser..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4" />
              Create New Group
            </button>
          </div>
        </div>
      </div>

      {/* Groups List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredGroups.map((group) => (
          <div key={group.id} className="card">
            <div className="card-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <Users className="w-5 h-5" style={{ color: '#800020' }} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{group.name}</h3>
                    <span className="badge info">{group.members.length} members</span>
                  </div>
                  
                  <div style={{ marginLeft: '2rem', marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Project:</strong> {group.project}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Adviser:</strong> {group.adviser}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <strong>Created:</strong> {group.createdDate}
                    </p>
                  </div>

                  {/* Members List */}
                  <div style={{ marginLeft: '2rem', marginTop: '0.75rem' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Members:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {group.members.length > 0 ? (
                        group.members.map((member) => (
                          <div
                            key={member.id}
                            style={{
                              padding: '0.5rem 0.75rem',
                              background: '#f9fafb',
                              border: '1px solid #e5e7eb',
                              borderRadius: '0.5rem',
                              fontSize: '0.75rem'
                            }}
                          >
                            <p style={{ fontWeight: '600', color: '#111827' }}>{member.name}</p>
                            <p style={{ color: '#6b7280' }}>{member.studentId}</p>
                          </div>
                        ))
                      ) : (
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic' }}>No members assigned yet</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEditGroup(group)}
                    style={{ padding: '0.5rem' }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteGroup(group.id)}
                    style={{ padding: '0.5rem' }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <div className="card">
            <div className="card-content" style={{ textAlign: 'center', padding: '2rem' }}>
              <Users className="w-12 h-12" style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
              <p style={{ color: '#6b7280' }}>No groups found matching your search</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '500px', margin: 0 }}>
            <div className="card-header">
              <h2 className="card-title">Create New Group</h2>
              <p className="card-description">Enter the details for the new group</p>
            </div>
            <div className="card-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Group Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Group Alpha"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Smart Home IoT System"
                  value={newGroup.project}
                  onChange={(e) => setNewGroup({ ...newGroup, project: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Assign Adviser *</label>
                <select
                  value={newGroup.adviser}
                  onChange={(e) => setNewGroup({ ...newGroup, adviser: e.target.value })}
                  className="form-input"
                >
                  <option value="">Select an adviser</option>
                  {availableAdvisers.map((adviser) => (
                    <option key={adviser} value={adviser}>{adviser}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleCreateGroup}
                  style={{ flex: 1 }}
                  disabled={!newGroup.name || !newGroup.project || !newGroup.adviser}
                >
                  Create Group
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewGroup({ name: '', project: '', adviser: '' });
                  }}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditModal && selectedGroup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '600px', margin: 0 }}>
            <div className="card-header">
              <h2 className="card-title">Edit {selectedGroup.name}</h2>
              <p className="card-description">Modify group details and members</p>
            </div>
            <div className="card-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Group Name</label>
                <input
                  type="text"
                  value={selectedGroup.name}
                  onChange={(e) => setSelectedGroup({ ...selectedGroup, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  value={selectedGroup.project}
                  onChange={(e) => setSelectedGroup({ ...selectedGroup, project: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Adviser</label>
                <select
                  value={selectedGroup.adviser}
                  onChange={(e) => setSelectedGroup({ ...selectedGroup, adviser: e.target.value })}
                  className="form-input"
                >
                  {availableAdvisers.map((adviser) => (
                    <option key={adviser} value={adviser}>{adviser}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Current Members</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {selectedGroup.members.map((member) => (
                    <div
                      key={member.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{member.name}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{member.studentId}</p>
                      </div>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        onClick={() => {
                          setSelectedGroup({
                            ...selectedGroup,
                            members: selectedGroup.members.filter(m => m.id !== member.id)
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {selectedGroup.members.length === 0 && (
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic' }}>No members in this group</p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setGroups(groups.map(g => g.id === selectedGroup.id ? selectedGroup : g));
                    setShowEditModal(false);
                    setSelectedGroup(null);
                  }}
                  style={{ flex: 1 }}
                >
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedGroup(null);
                  }}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
