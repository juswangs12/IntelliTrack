import { useState } from 'react';
import { Users, UserPlus, ArrowRight, Check, X, Search } from 'lucide-react';

export function GroupAssignment() {
  const [students] = useState([
    { id: 1, name: 'Juan Dela Cruz', studentId: '2021-00001', email: 'juan@example.com', groupId: 1 },
    { id: 2, name: 'Maria Santos', studentId: '2021-00002', email: 'maria@example.com', groupId: 1 },
    { id: 3, name: 'Pedro Garcia', studentId: '2021-00003', email: 'pedro@example.com', groupId: 1 },
    { id: 4, name: 'Ana Lopez', studentId: '2021-00004', email: 'ana@example.com', groupId: 2 },
    { id: 5, name: 'Carlos Reyes', studentId: '2021-00005', email: 'carlos@example.com', groupId: 2 },
    { id: 6, name: 'Sofia Martinez', studentId: '2021-00006', email: 'sofia@example.com', groupId: null },
    { id: 7, name: 'Diego Fernandez', studentId: '2021-00007', email: 'diego@example.com', groupId: null },
    { id: 8, name: 'Isabella Cruz', studentId: '2021-00008', email: 'isabella@example.com', groupId: null },
    { id: 9, name: 'Luis Hernandez', studentId: '2021-00009', email: 'luis@example.com', groupId: null },
    { id: 10, name: 'Carmen Diaz', studentId: '2021-00010', email: 'carmen@example.com', groupId: null }
  ]);

  const [groups] = useState([
    { id: 1, name: 'Group Alpha', project: 'IoT Smart Home System', adviserId: 1 },
    { id: 2, name: 'Group Beta', project: 'E-Commerce Platform', adviserId: 2 },
    { id: 3, name: 'Group Gamma', project: 'Mobile Health Tracker', adviserId: null },
    { id: 4, name: 'Group Delta', project: 'AI Chatbot System', adviserId: null }
  ]);

  const [advisers] = useState([
    { id: 1, name: 'Dr. Maria Garcia', email: 'garcia@example.com', maxGroups: 3 },
    { id: 2, name: 'Dr. John Smith', email: 'smith@example.com', maxGroups: 3 },
    { id: 3, name: 'Dr. Robert Lee', email: 'lee@example.com', maxGroups: 3 },
    { id: 4, name: 'Dr. Sarah Johnson', email: 'johnson@example.com', maxGroups: 3 },
    { id: 5, name: 'Dr. Michael Brown', email: 'brown@example.com', maxGroups: 3 }
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedTargetGroup, setSelectedTargetGroup] = useState(null);
  const [selectedAdviser, setSelectedAdviser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('students'); // 'students' or 'advisers'

  // Student Assignment Functions
  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssignStudentsToGroup = () => {
    if (selectedStudents.length > 0 && selectedTargetGroup) {
      alert(`Assigned ${selectedStudents.length} student(s) to ${selectedTargetGroup.name}`);
      setSelectedStudents([]);
      setSelectedTargetGroup(null);
    }
  };

  // Group Assignment Functions
  const toggleGroupSelection = (groupId) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleAssignGroupsToAdviser = () => {
    if (selectedGroups.length > 0 && selectedAdviser) {
      alert(`Assigned ${selectedGroups.length} group(s) to ${selectedAdviser.name}`);
      setSelectedGroups([]);
      setSelectedAdviser(null);
    }
  };

  const unassignedStudents = students.filter(s => s.groupId === null);
  const assignedStudents = students.filter(s => s.groupId !== null);
  const unassignedGroups = groups.filter(g => g.adviserId === null);
  const assignedGroups = groups.filter(g => g.adviserId !== null);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm)
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Group Assignment</h1>
        <p className="page-description">Assign students to groups and groups to advisers</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e5e7eb' }}>
        <button
          onClick={() => setActiveTab('students')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'students' ? '3px solid #800020' : '3px solid transparent',
            color: activeTab === 'students' ? '#800020' : '#6b7280',
            fontWeight: activeTab === 'students' ? '600' : '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users className="w-4 h-4" />
            Assign Students to Groups
          </div>
        </button>
        <button
          onClick={() => setActiveTab('advisers')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'advisers' ? '3px solid #800020' : '3px solid transparent',
            color: activeTab === 'advisers' ? '#800020' : '#6b7280',
            fontWeight: activeTab === 'advisers' ? '600' : '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus className="w-4 h-4" />
            Assign Groups to Advisers
          </div>
        </button>
      </div>

      {/* Student to Group Assignment Tab */}
      {activeTab === 'students' && (
        <>
          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
            <div className="stat-card">
              <div className="stat-icon maroon">
                <Users className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Students</p>
                <p className="stat-value">{students.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <Check className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Assigned</p>
                <p className="stat-value">{assignedStudents.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon gold">
                <X className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Unassigned</p>
                <p className="stat-value">{unassignedStudents.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <Users className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Selected</p>
                <p className="stat-value">{selectedStudents.length}</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-content">
              <div style={{ position: 'relative' }}>
                <Search className="w-5 h-5" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type="text"
                  placeholder="Search students by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1.5rem', alignItems: 'start' }}>
            {/* Student Selection Panel */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Select Students</h2>
                <p className="card-description">Choose students to assign ({selectedStudents.length} selected)</p>
              </div>
              <div className="card-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudents.includes(student.id);
                    const assignedGroup = groups.find(g => g.id === student.groupId);
                    
                    return (
                      <div
                        key={student.id}
                        onClick={() => toggleStudentSelection(student.id)}
                        style={{
                          padding: '0.75rem',
                          border: isSelected ? '2px solid #800020' : '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          background: isSelected ? '#fff7ed' : assignedGroup ? '#f9fafb' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.125rem' }}>
                              {student.name}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {student.studentId} • {student.email}
                            </p>
                            {assignedGroup && (
                              <span className="badge success" style={{ marginTop: '0.25rem', fontSize: '0.65rem' }}>
                                {assignedGroup.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Arrow and Assignment Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', paddingTop: '5rem' }}>
              <ArrowRight className="w-8 h-8" style={{ color: selectedStudents.length > 0 && selectedTargetGroup ? '#800020' : '#d1d5db' }} />
              <button
                className="btn btn-primary"
                onClick={handleAssignStudentsToGroup}
                disabled={selectedStudents.length === 0 || !selectedTargetGroup}
                style={{
                  padding: '0.75rem 1.5rem',
                  opacity: selectedStudents.length === 0 || !selectedTargetGroup ? 0.5 : 1
                }}
              >
                Assign
              </button>
            </div>

            {/* Group Selection Panel */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Select Target Group</h2>
                <p className="card-description">Choose a group to assign students to</p>
              </div>
              <div className="card-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
                  {filteredGroups.map((group) => {
                    const isSelected = selectedTargetGroup?.id === group.id;
                    const memberCount = students.filter(s => s.groupId === group.id).length;
                    const adviser = advisers.find(a => a.id === group.adviserId);
                    
                    return (
                      <div
                        key={group.id}
                        onClick={() => setSelectedTargetGroup(group)}
                        style={{
                          padding: '1rem',
                          border: isSelected ? '2px solid #800020' : '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          background: isSelected ? '#fff7ed' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                          <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => {}}
                            style={{ marginTop: '0.25rem', cursor: 'pointer' }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{group.name}</p>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                              {group.project}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span className="badge info" style={{ fontSize: '0.65rem' }}>
                                {memberCount} members
                              </span>
                              {adviser && (
                                <span className="badge success" style={{ fontSize: '0.65rem' }}>
                                  {adviser.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Group to Adviser Assignment Tab */}
      {activeTab === 'advisers' && (
        <>
          {/* Stats */}
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
              <div className="stat-icon green">
                <Check className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Assigned</p>
                <p className="stat-value">{assignedGroups.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon gold">
                <X className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Unassigned</p>
                <p className="stat-value">{unassignedGroups.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <Users className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Selected</p>
                <p className="stat-value">{selectedGroups.length}</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-content">
              <div style={{ position: 'relative' }}>
                <Search className="w-5 h-5" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type="text"
                  placeholder="Search groups by name or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1.5rem', alignItems: 'start' }}>
            {/* Group Selection Panel */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Select Groups</h2>
                <p className="card-description">Choose groups to assign ({selectedGroups.length} selected)</p>
              </div>
              <div className="card-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
                  {filteredGroups.map((group) => {
                    const isSelected = selectedGroups.includes(group.id);
                    const memberCount = students.filter(s => s.groupId === group.id).length;
                    const adviser = advisers.find(a => a.id === group.adviserId);
                    
                    return (
                      <div
                        key={group.id}
                        onClick={() => toggleGroupSelection(group.id)}
                        style={{
                          padding: '0.75rem',
                          border: isSelected ? '2px solid #800020' : '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          background: isSelected ? '#fff7ed' : adviser ? '#f9fafb' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                              {group.name}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                              {group.project}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span className="badge info" style={{ fontSize: '0.65rem' }}>
                                {memberCount} members
                              </span>
                              {adviser && (
                                <span className="badge success" style={{ fontSize: '0.65rem' }}>
                                  {adviser.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Arrow and Assignment Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', paddingTop: '5rem' }}>
              <ArrowRight className="w-8 h-8" style={{ color: selectedGroups.length > 0 && selectedAdviser ? '#800020' : '#d1d5db' }} />
              <button
                className="btn btn-primary"
                onClick={handleAssignGroupsToAdviser}
                disabled={selectedGroups.length === 0 || !selectedAdviser}
                style={{
                  padding: '0.75rem 1.5rem',
                  opacity: selectedGroups.length === 0 || !selectedAdviser ? 0.5 : 1
                }}
              >
                Assign
              </button>
            </div>

            {/* Adviser Selection Panel */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Select Adviser</h2>
                <p className="card-description">Choose an adviser to assign groups to</p>
              </div>
              <div className="card-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
                  {advisers.map((adviser) => {
                    const isSelected = selectedAdviser?.id === adviser.id;
                    const assignedGroupCount = groups.filter(g => g.adviserId === adviser.id).length;
                    const remaining = adviser.maxGroups - assignedGroupCount;
                    
                    return (
                      <div
                        key={adviser.id}
                        onClick={() => setSelectedAdviser(adviser)}
                        style={{
                          padding: '1rem',
                          border: isSelected ? '2px solid #800020' : '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          background: isSelected ? '#fff7ed' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          opacity: remaining === 0 ? 0.6 : 1
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                          <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => {}}
                            style={{ marginTop: '0.25rem', cursor: 'pointer' }}
                            disabled={remaining === 0}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{adviser.name}</p>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                              {adviser.email}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span className={`badge ${remaining === 0 ? 'danger' : remaining <= 1 ? 'warning' : 'success'}`} style={{ fontSize: '0.65rem' }}>
                                {assignedGroupCount}/{adviser.maxGroups} groups
                              </span>
                              {remaining > 0 && (
                                <span className="badge info" style={{ fontSize: '0.65rem' }}>
                                  {remaining} slots available
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
