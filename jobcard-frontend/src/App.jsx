import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Login Page Path 
import Register from "./pages/Register";
import Login from "./pages/Login";

// Advisor Page Path
import AdvisorRoute from "./pages/advisor/AdvisorRoute";
import CreateJobCard from "./pages/advisor/CreateJobCard";

// Technician Page Path
import TechnicianRoute from "./pages/technician/TechnicianRoute";
import TechnicianJobs from "./pages/technician/TechnicianJobs";
import TechnicianIssues from "./pages/technician/TechnicianIssue";
import TechnicianCompleteJob from "./pages/technician/TechnicianCompleteJob";

// Cashier Page Path
import CashierRoute from "./pages/cashier/CashierRoute";
import Billing from "./pages/cashier/Billing";

// Manager Page Path
import ManagerAssignTechnician from "./pages/manager/ManagerAssignTechnician";
import ManagerRoute from "./pages/manager/ManagerRoute";
import ManagerKanban from "./pages/manager/ManagerKanban";
import AdvisorLinks from "./pages/advisor/AdvisorLinks";
import TechnicianLinks from "./pages/technician/TechnicianLinks";
import ManagerLinks from "./pages/manager/ManagerLinks";
import CashierLinks from "./pages/cashier/CashierLinks";
import Authentication from "./pages/manager/Authentication";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login />} />
        <Route path="/advisor" element={<AdvisorLinks/>}/>
        <Route 
        path="/advisor/jobcard" 
        element={
          <AdvisorRoute>
            <CreateJobCard />
          </AdvisorRoute>
          } 
        />
        <Route path="/technician" element={<TechnicianLinks/>}/>
         <Route
          path="/technician/jobs"
          element={
            <TechnicianRoute>
              <TechnicianJobs />
            </TechnicianRoute>
          }
        />
         <Route
          path="/technician/issues"
          element={
            <TechnicianRoute>
              <TechnicianIssues />
            </TechnicianRoute>
          }
        />
        <Route
          path="/technician/complete"
          element={
            <TechnicianRoute>
              <TechnicianCompleteJob />
            </TechnicianRoute>
          }
        />
        <Route path="/cashier" element={<CashierLinks/>}/>
        <Route
          path="/cashier/billing"
          element={
            <CashierRoute>
              <Billing />
            </CashierRoute>
          }
        />
        <Route path="/manager" element={<ManagerLinks/>}/>
         <Route
          path="/manager/assign"
          element={
            <ManagerRoute>
              <ManagerAssignTechnician />
            </ManagerRoute>
          }
        />
        <Route
          path="/manager/kanban"
          element={
            <ManagerRoute>
              <ManagerKanban />
            </ManagerRoute>
          }
        />
        <Route path="/Authenticate" element={<Authentication/>} />

        <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
