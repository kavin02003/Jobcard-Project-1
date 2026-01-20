import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Authentication() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/jobcards/user");
    setUsers(res.data);
  };

  const approveUser = async (id) => {
    await api.put(`/jobcards/user/${id}/approve`);
    fetchUsers();
  };

  const rejectUser = async (id) => {
    await api.put(`/jobcards/user/${id}/reject`);
    fetchUsers();
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <h2>User Approval</h2>

      {users.map(user => (
        <div
          key={user._id}
          style={{ border: "1px solid #ccc", padding: 15, marginBottom: 15 }}
        >
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>

          <p>
            <b>Status:</b>{" "}
            {user.approved ? "✅ Approved" : "⏳ Pending"}
          </p>

          <button
            onClick={() => approveUser(user._id)}
            disabled={user.approved}
            style={{ marginRight: 10 }}
          >
            Approve
          </button>

          <button
            onClick={() => rejectUser(user._id)}
            disabled={!user.approved}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
