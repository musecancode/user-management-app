import { useState } from "react";
import axios from "./api/axios";

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleUpload = async () => {
    setMessage(null);
    setErrors([]);

    if (!file) {
      setMessage("❌ Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Users uploaded successfully!");
    } catch (error: any) {
      const backendErrors = error.response?.data?.detail || "Upload failed.";
      setMessage("❌ Upload failed.");
      setErrors(Array.isArray(backendErrors) ? backendErrors : [backendErrors]);
    }
  };

  const handleSampleDownload = () => {
    window.location.href = "http://localhost:8000/sample";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>📤 Bulk Upload Users</h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ marginTop: "10px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleUpload}
          style={{
            padding: "10px 24px",
            fontSize: "16px",

            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Upload
        </button>

        <button
          onClick={handleSampleDownload}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            marginLeft: "20px",

            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download Sample
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: "15px",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}

      {errors.length > 0 && (
        <ul style={{ color: "red", marginTop: "10px" }}>
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
