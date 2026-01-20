import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./ManagerKanban.css";

const STATUSES = [
  "CREATED",
  "IN_PROGRESS",
  "ISSUE_REPORTED",
  "DONE",
  "BILLED",
  "DELIVERED"
];

export default function ManagerKanban() {
  const [kanban, setKanban] = useState({});

  const fetchKanban = async () => {
    const res = await api.get("/jobcards/kanban");
    setKanban(res.data);
  };

  useEffect(() => {
    fetchKanban();
  }, []);

  const markDelivered = async (jobId) => {
    try {
      await api.put(`/jobcards/${jobId}/status`, {
        status: "DELIVERED"
      });
      fetchKanban(); // refresh board
    } catch (err) {
      alert("Failed to mark delivered");
    }
  };

  return (
    <div className="kanban-board">
      {STATUSES.map(status => (
        <div key={status} className="kanban-column">
          <h4 className="kanban-header">{status}</h4>

          {kanban[status]?.length === 0 && (
            <p className="kanban-empty">No jobs</p>
          )}

          {kanban[status]?.map(job => (
            <div key={job._id} className="kanban-card">
              <p><b>Vehicle:</b> {job.vehicleNumber}</p>
              <p><b>Customer:</b> {job.customerName}</p>
              <p><b>Phone:</b> {job.customerPhone}</p>
              <p><b>Status:</b> {job.status}</p>
              <p><b>Service:</b> {job.servicesRequested}</p>

              <p>
                <b>Technician:</b>{" "}
                {job.assignedTechnician ? (
                  <span className="kanban-tech">
                    {job.assignedTechnician.name}
                  </span>
                ) : (
                  <span className="kanban-unassigned">
                    Not Assigned
                  </span>
                )}
              </p>

              {/* ✅ DELIVERED BUTTON */}
              {job.status === "BILLED" && (
                <button
                  className="deliver-btn"
                  onClick={() => markDelivered(job._id)}
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
