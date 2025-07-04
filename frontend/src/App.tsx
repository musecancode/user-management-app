import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./AppHeader";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import BulkUpload from "./BulkUpload";

import { useState } from "react";
import "./App.css";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pan: string;
}

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
      <AppHeader />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <UserForm
                editingUser={editingUser}
                setEditingUser={setEditingUser}
              />
            }
          />
          <Route
            path="/users"
            element={<UserTable setEditingUser={setEditingUser} />}
          />
          <Route path="/upload" element={<BulkUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
