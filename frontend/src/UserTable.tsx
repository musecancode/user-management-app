import { useEffect, useState } from "react";
import axios from "./api/axios";
import "./UserTable.css";
import type { User } from "./App";
import { useNavigate } from "react-router-dom";

interface Props {
  setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function UserTable({ setEditingUser }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 5;

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const skip = page * limit;
      const response = await axios.get<User[]>(
        `/users?search=${search}&skip=${skip}&limit=${limit}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    navigate("/"); // back to form
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/users/${id}`);
      fetchUsers(); // refresh after delete
    } catch (error) {
      alert("Failed to delete user.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>

      <input
        type="text"
        placeholder="Search by name, email or phone"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0); // reset to first page on new search
        }}
        style={{ marginBottom: "10px", padding: "6px", width: "300px" }}
      />

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Phone</th>
                <th>PAN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>•••••••••••</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button
                      style={{ marginLeft: "8px" }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "10px" }}>
            <button
              className="pagination-button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>Page {page + 1}</span>
            <button
              className="pagination-button"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
