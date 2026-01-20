import { useEffect, useState } from "react";
import api from "../../api/axios";
import './TechnicianCompletejob.css'

export default function TechnicianCompleteJob() {
  const [jobs, setJobs] = useState([]);
  const [forms, setForms] = useState({});

  const fetchJobs = async () => {
    const res = await api.get("/jobcards/my");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (jobId, field, value) => {
    setForms(prev => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [field]: value
      }
    }));
  };

  const completeJob = async (jobId) => {
    const data = forms[jobId];

    if (!data?.workDone) {
      return alert("Work done is required");
    }

    await api.put(`/jobcards/${jobId}/complete`, data);

    setForms(prev => ({ ...prev, [jobId]: {} }));
    fetchJobs();
  };

  return (
    <div style={{ maxWidth: 800, margin: "30px auto" }} className="tech-complete-container">
      <h2>Complete Assigned Jobs</h2>

      {jobs.map(job => (
        <div
          key={job._id}
          className="complete-card"
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 20
          }}
        >
          <b>JobcardId:</b> {job._id}<br/>
          <p><b>vehicleNumber:</b> {job.vehicleNumber}</p>
          <p className="job-status"><b>Status:</b> {job.status}</p>

          {/* 🟡 BEFORE DONE */}
          {job.status !== "DONE" && (
            <>
              <input
                placeholder="Work Done"
                value={forms[job._id]?.workDone || ""}
                onChange={(e) =>
                  handleChange(job._id, "workDone", e.target.value)
                }
                style={{ width: "100%", marginBottom: 8 }}
              />

              <input
                placeholder="Next Service Advice"
                value={forms[job._id]?.nextServiceAdvice || ""}
                onChange={(e) =>
                  handleChange(job._id, "nextServiceAdvice", e.target.value)
                }
                style={{ width: "100%", marginBottom: 8 }}
              />

              <textarea
                placeholder="Prevention Tips"
                value={forms[job._id]?.preventionTips || ""}
                onChange={(e) =>
                  handleChange(job._id, "preventionTips", e.target.value)
                }
                style={{ width: "100%", height: 60 }}
              />

              <button
                onClick={() => completeJob(job._id)}
                style={{ marginTop: 10 }}
              >
                Mark as DONE
              </button>
            </>
          )}

          {/* 🟢 AFTER DONE */}
          {job.status === "DONE" && job.completionSummary && (
            <div style={{ marginTop: 10 }} className="completed-summary">
              <p style={{ color: "green" }} className="completed-title">✅ Job Completed</p>

              <p><b>Work Done:</b> {job.completionSummary.workDone}</p>
              <p><b>Next Service Advice:</b> {job.completionSummary.nextServiceAdvice}</p>
              <p><b>Prevention Tips:</b> {job.completionSummary.preventionTips}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
