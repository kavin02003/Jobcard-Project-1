import { useEffect, useState } from "react";
import api from "../../api/axios";
import './TechnicianJobs.css'

export default function TechnicianJobs() {
  const [jobs, setJobs] = useState([]);
  const [notes, setNotes] = useState({});

  const fetchJobs = async () => {
    // assuming backend filters jobs by assigned technician
    const res = await api.get("/jobcards/my");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateProgress = async (jobId) => {
    const note = notes[jobId];
    if (!note) return alert("Enter progress note");

    await api.put(`/jobcards/${jobId}/progress`, {
      note
    });

    setNotes(prev => ({ ...prev, [jobId]: "" }));
    fetchJobs();
  };

  return (
    <div style={{ maxWidth: 700, margin: "30px auto" }} className="tech-jobs-container">
      <h2>My Assigned Jobs</h2>

      {jobs.map(job => (
        <div
          key={job._id}
          className="job-card"
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15
          }}
        >
          <div className="job-status">
            <b>JobcardId:</b>{job._id}<br/><br/>
            <b>vehicleNumber:</b>{job.vehicleNumber}<br/><br/>
            <b>Status:</b> {job.status}
          </div>
          

          <div style={{ marginTop: 10 }}>
            <textarea
              placeholder="Enter progress note"
              value={notes[job._id] || ""}
              onChange={(e) =>
                setNotes({ ...notes, [job._id]: e.target.value })
              }
              style={{ width: "100%", height: 60 }}
            />
          </div>

          <button
            onClick={() => updateProgress(job._id)}
            style={{ marginTop: 8 }}
          >
            Mark In Progress
          </button>

          <hr />

          <h4>Technician Updates</h4>
          {job.technicianUpdates.map((u, i) => (
            <p key={i} className="job-update">
              • {u.note}{" "}
              <small>({new Date(u.createdAt).toLocaleString()})</small>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
