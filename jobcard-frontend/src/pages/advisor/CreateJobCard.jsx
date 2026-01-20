import { useState } from "react";
import api from "../../api/axios";
import './CreateJobCard.css'

export default function CreateJobCard() {
  const [form, setForm] = useState({
    vehicleType: "2W",
    vehicleNumber: "",
    customerName: "",
    customerPhone: "",
    servicesRequested: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        servicesRequested: form.servicesRequested
          .split(",")
          .map(s => s.trim())
      };

      const res = await api.post("/jobcards", payload);
      alert("Job Card Created Successfully");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error creating job card");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }} className="jobcard-container">
      <h2>Create Job Card</h2>

      <form onSubmit={handleSubmit}>
        <label>Vehicle Type</label>
        <select
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
        >
          <option value="2W">2 Wheeler</option>
          <option value="4W">4 Wheeler</option>
        </select>

        <br /><br />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="customerPhone"
          placeholder="Customer Phone"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="servicesRequested"
          placeholder="Services (comma separated)"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Create Job Card</button>
      </form>
    </div>
  );
}
