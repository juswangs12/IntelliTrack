import { Plus, Search, Edit, Trash2, UserPlus } from "lucide-react";

export function UserManagement() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "student@example.com",
      role: "Student",
      status: "Active",
      joinDate: "2024-09-01",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      email: "coordinator@example.com",
      role: "Coordinator",
      status: "Active",
      joinDate: "2023-06-15",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2022-01-10",
    },
    {
      id: 4,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Student",
      status: "Active",
      joinDate: "2024-09-01",
    },
    {
      id: 5,
      name: "Dr. Bob Williams",
      email: "bob@example.com",
      role: "Coordinator",
      status: "Active",
      joinDate: "2023-08-20",
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-description">Manage all users in the system</p>
      </div>

      <div className="card">
        <div className="card-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flex: 1,
                maxWidth: "400px",
              }}
            >
              <input
                type="text"
                placeholder="Search users..."
                className="form-input"
                style={{ flex: 1 }}
              />
              <button className="btn btn-secondary">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-secondary">Import Users</button>
              <button className="btn btn-primary">
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "Admin"
                            ? "danger"
                            : user.role === "Coordinator"
                            ? "warning"
                            : "info"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className="badge success">{user.status}</span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn btn-secondary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="btn btn-danger">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
