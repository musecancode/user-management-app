import { useEffect, useState } from "react";
import axiosInstance from "./api/axios";
import axios from "axios";
import "./UserForm.css";
import type { User } from "./App";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  editingUser: User | null;
  setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function UserForm({ editingUser, setEditingUser }: Props) {
  const [formData, setFormData] = useState<User>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    pan: "",
  });

  const [errors, setErrors] = useState<Partial<User>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [showPAN, setShowPAN] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const validate = (): boolean => {
    const newErrors: Partial<User> = {};
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.pan || !panRegex.test(formData.pan))
      newErrors.pan = "Invalid PAN format (e.g., ABCDE1234F)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    if (!validate()) return;

    try {
      if (editingUser) {
        await axiosInstance.put(`/users/${editingUser.id}`, formData);
        setSuccessMsg("User updated successfully!");
        setEditingUser(null);
      } else {
        await axiosInstance.post("/users", formData);
        setSuccessMsg("User created successfully!");
      }

      setFormData({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        pan: "",
      });

      setErrors({});
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Error submitting form");
      } else {
        alert("Unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
      />
      {errors.first_name && <div className="error">{errors.first_name}</div>}

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
      />
      {errors.last_name && <div className="error">{errors.last_name}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <div className="error">{errors.email}</div>}

      <input
        type="text"
        name="phone"
        placeholder="Phone (10 digits)"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <div className="error">{errors.phone}</div>}

      {/* PAN field with icon */}
      <div style={{ position: "relative" }}>
        <input
          type={showPAN ? "text" : "password"}
          name="pan"
          placeholder="PAN Number (ABCDE1234F)"
          value={formData.pan}
          onChange={handleChange}
          style={{ paddingRight: "2.5rem" }}
        />
        <button
          type="button"
          onClick={() => setShowPAN(!showPAN)}
          tabIndex={-1}
        >
          {showPAN ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {errors.pan && <div className="error">{errors.pan}</div>}

      <button type="submit">{editingUser ? "Update" : "Submit"}</button>

      {successMsg && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>
      )}
    </form>
  );
}
