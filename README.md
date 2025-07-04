#  User Management Web App

This is a full-stack user management system built with **React** (frontend) **TypeScript** and **FastAPI + MySQL** (backend). It supports creating, editing, deleting, searching, and bulk uploading users via Excel files.

---

##  Technologies Used

### Frontend
- React (Vite)
- TypeScript
- Axios
- Lucide React (icons)
- Tailwind CSS / Custom CSS

### Backend
- FastAPI
- SQLAlchemy
- MySQL
- Uvicorn
- OpenPyXL
- CORS Middleware

##  Folder Structure

project-root/
├── frontend/ # React frontend
├── backend/ # FastAPI backend
├── assets/ # Sample Excel + DB dump
│ ├── sample.xlsx
│ └── db_dump.sql
├── .gitignore
└── README.md

# Features
Add / Edit / Delete Users

Search with pagination

Excel bulk upload

Downloadable Excel template

Validations for phone, email, PAN

Responsive UI for mobile and desktop

# ⚙️ Setup Instructions

 1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

 2. Backend Setup (FastAPI + MySQL)

cd backend
python -m venv venv
venv\Scripts\activate  # (On Windows)
 source venv/bin/activate  # (On macOS/Linux)

pip install -r requirements.txt
 Create MySQL database:


CREATE DATABASE user_management;

 Run the server:

uvicorn main:app --reload

3. Frontend Setup (React)
bash
Copy code
cd ../frontend
npm install
npm run dev

# Assumptions & Known Issues
PAN number must follow ABCDE1234F format.

Email validation uses a basic regex.

Phone number must be exactly 10 digits.

CORS allowed for localhost:5173 only.
# Preview
![image](https://github.com/user-attachments/assets/a806847a-20a4-49a3-b99d-d0900d5afb1b)
![image](https://github.com/user-attachments/assets/e1287616-7308-485e-89fa-91e3ee745180)

![image](https://github.com/user-attachments/assets/75512b6b-2fd7-4f90-a7df-615e86e51f48)

