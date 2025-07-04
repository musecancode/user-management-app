import { Link } from "react-router-dom";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <header className="header">
      <h1>User Management App</h1>
      <nav>
        <Link to="/">Add User</Link>
        <Link to="/users">View User List</Link>
        <Link to="/upload">Bulk Upload</Link>
      </nav>
    </header>
  );
}
