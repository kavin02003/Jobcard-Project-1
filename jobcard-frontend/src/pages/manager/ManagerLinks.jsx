import { Link } from "react-router-dom";


export default function ManagerLinks(){
    return(
        <div>
             <h2><Link to="/manager/assign">Assign Technician</Link></h2>
             <h2><Link to="/manager/kanban">Kanban View</Link></h2>
             <h2><Link to="/Authenticate">Approved User</Link></h2>
        </div>
    )
}