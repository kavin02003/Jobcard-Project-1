import { useEffect, useState } from "react";
import api from "../../api/axios";
import './TechnicianIssue.css'

export default function TechnicianIssues() {
  const [jobs, setJobs] = useState([]);
  const [notes, setNotes] = useState({});

  const fetchJobs = async () => {
    // jobs assigned to this technician
    const res = await api.get("/jobcards/my");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const reportIssue = async (jobId) => {
    const note = notes[jobId];
    if (!note) return alert("Enter issue details");

    await api.put(`/jobcards/${jobId}/issue`, {
      note
    });

    setNotes(prev => ({ ...prev, [jobId]: "" }));
    fetchJobs();
  };

  return (
    <div style={{ maxWidth: 700, margin: "30px auto" }} className="tech-issues-container">
      <h2>Report Issues</h2>

      {jobs.map(job => (
        <div
          key={job._id}
          className="issue-card"
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15
          }}
        >
          <p className="issue-status">
            <b>JobcardId:</b>{job._id}<br/><br/>
            <b>vehicleNumber:</b>{job.vehicleNumber}<br/><br/>
            <b>Status:</b> {job.status}
          </p>

          <textarea
            placeholder="Describe the issue..."
            value={notes[job._id] || ""}
            onChange={(e) =>
              setNotes({ ...notes, [job._id]: e.target.value })
            }
            style={{ width: "100%", height: 60 }}
          />

          <button
            onClick={() => reportIssue(job._id)}
            style={{ marginTop: 8 }}
          >
            Report Issue
          </button>

          <hr />

          <h4>Technician Updates</h4>
          {job.technicianUpdates.map((u, i) => (
            <p key={i} className={`issue-update ${u.isCritical ? "critical" : "info"}`}>
              {u.isCritical ? "🚨" : "ℹ️"} {u.note}{" "}
              <small>({new Date(u.createdAt).toLocaleString()})</small>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
