import { useEffect, useState } from "react";
import api from "../../api/axios";
import './ManagerAssignTechnician.css';

export default function ManagerAssignTechnician() {
  const [jobs, setJobs] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetchJobs();
    fetchTechnicians();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("/jobcards");
    setJobs(res.data);
  };

  const fetchTechnicians = async () => {
    const res = await api.get("/jobcards/users", {
      params: { role: "TECHNICIAN" }
    });
    setTechnicians(res.data);
  };

  const assignTechnician = async (jobId) => {
    const technicianId = selected[jobId];
    if (!technicianId) return alert("Select technician");

    await api.put(`/jobcards/${jobId}/assign`, {
      technicianId
    });

    fetchJobs();
  };

  return (
    <div style={{ maxWidth: 900, margin: "30px auto" }} className="manager-assign-container">
      <h2>Assign Technician</h2>

      {jobs.map(job => (
        <div key={job._id} className="assign-card" style={{ border: "1px solid #ccc", padding: 15 }}>
          <p><b>Vehicle:</b> {job.vehicleNumber}</p>

          <p>
             <b>Assigned:</b>{" "}
            {job.assignedTechnician ? (
              <span className="assigned">{job.assignedTechnician.name}</span>
            ) : (
              <span className="not-assigned">Not Assigned</span>
             )}
          </p>

          <select
            value={selected[job._id] || ""}
            onChange={(e) =>
              setSelected(prev => ({
                ...prev,
                [job._id]: e.target.value
              }))
            }
          >
            <option value="">-- Select Technician --</option>

            {technicians.map(t => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          <br />

          <button onClick={() => assignTechnician(job._id)}>
            Assign Technician
          </button>
        </div>
      ))}
    </div>
  );
}
