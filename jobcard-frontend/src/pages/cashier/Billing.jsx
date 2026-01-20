import { useEffect, useState } from "react";
import api from "../../api/axios";
import './Billing.css'

export default function Billing() {
  const [jobs, setJobs] = useState([]);
  const [parts, setParts] = useState({});
  const [bills, setBills] = useState({});

  const fetchJobs = async () => {
    const res = await api.get("/jobcards?status=DONE");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addPart = (jobId) => {
    setParts(prev => ({
      ...prev,
      [jobId]: [...(prev[jobId] || []), { partId: "", quantity: 1 }]
    }));
  };

  const updatePart = (jobId, index, field, value) => {
    const updated = [...parts[jobId]];
    updated[index][field] = value;
    setParts(prev => ({ ...prev, [jobId]: updated }));
  };

  const generateBill = async (jobId) => {
    try {
      const res = await api.post(`/jobcards/${jobId}/bill`, {
        spareParts: parts[jobId]
      });

      setBills(prev => ({ ...prev, [jobId]: res.data }));
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Billing failed");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "30px auto" }} className="billing-container">
      <h2>Cashier Billing</h2>

      {jobs.map(job => (
        <div
          key={job._id}
          className="billing-card"
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 20
          }}
        >
          <p><b>Vehicle:</b> {job.vehicleNumber}</p>
          <p><b>Status:</b> {job.status}</p>

          {!job.bill && (
            <>
              {(parts[job._id] || []).map((p, i) => (
                <div key={i} className="parts-row" style={{ display: "flex", gap: 10 }}>
                  <input
                    placeholder="Part ID (BP01)"
                    value={p.partId}
                    onChange={(e) =>
                      updatePart(job._id, i, "partId", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    min="1"
                    value={p.quantity}
                    onChange={(e) =>
                      updatePart(job._id, i, "quantity", Number(e.target.value))
                    }
                  />
                </div>
              ))}

              <button className="add-part-btn" onClick={() => addPart(job._id)}>
                + Add Spare Part
              </button>

              <br />

              <button
                className="generate-btn"
                onClick={() => generateBill(job._id)}
                style={{ marginTop: 10 }}
              >
                Generate Bill
              </button>
            </>
          )}

          {job.bill && (
            <div style={{ marginTop: 10 }} className="bill-success">
              <p style={{ color: "green" }}>✅ Bill Generated</p>
              <p className="bill-total"><b>Total:</b> ₹{job.bill.totalAmount}</p>
            </div>
          )}

          {bills[job._id] && (
            <div className="bill-details" style={{ marginTop: 10 }}>
              <h4>Bill Details</h4>
              {bills[job._id].sparePartsUsed.map((p, i) => (
                <p key={i}>
                  {p.partName} × {p.quantity} = ₹{p.price * p.quantity}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
