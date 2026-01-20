import { Link } from "react-router-dom";


export default function Technicianlinks(){
    return(
        <div>
              <h2><Link to="/technician/jobs">Update Initial Status</Link></h2>
              <h2><Link to="/technician/issues">Update Issues</Link></h2>
              <h2><Link to="/technician/complete">Update Complete Status</Link></h2>
        </div>
    )
}