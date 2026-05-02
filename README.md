# 📦 Makhzan Website

## 📌 Overview
Makhzan is a web-based inventory management system designed for medical facilities. It helps hospitals efficiently manage medications and reagents, especially in emergency situations where quick and accurate access to inventory data is critical.  

The system provides:
- Real-time inventory tracking  
- Expiration monitoring  
- Automated alerts  
- Streamlined ordering processes  

This ultimately improves healthcare quality and patient safety.

---

## 🎯 Motivation
Many hospitals rely on manual or inefficient inventory systems, which can lead to:
- Stock shortages  
- Use of expired medications  
- Delays in treatment  

Makhzan addresses these challenges by offering a centralized, secure, and automated platform that reduces human error and improves decision-making.

---

## 🧑‍🤝‍🧑 Team Members
1. Ghadeer Alsanonah  
2. Manar Al Abbas  
3. Sarah Alkhalifa  
4. Zahra Almadeh  

---

## 👥 User Roles

### 🛠️ System Admin
- Manages users, roles, and permissions  
- Controls system settings and notifications  
- Monitors system activity  

### 📦 Inventory Manager
- Manages inventory items (add, update, remove)  
- Monitors stock levels and expiration dates  
- Orders new supplies and approves requests  

### 🏥 Hospital Staff
- Views inventory by department  
- Searches and filters items  
- Submits and tracks inventory requests  

### 🚚 Supplier
- Views supply requests  
- Confirms product availability  
- Provides delivery details and updates order status  

---

## ⚙️ Key Features

### 🔍 Inventory Management
- Real-time inventory tracking  
- Department-based inventory view  
- Search and filtering options  

### ⏰ Expiration & Stock Alerts
Alerts for:
- Expired items  
- Near-expiry items  
- Low stock / out-of-stock items  

### 📦 Order Management
- Create and manage supply orders  
- Approve or reject requests  
- Track order status  

### 📊 Insights & Analytics
- View frequently used items  
- Track usage history  

### 🔔 Notifications
- Automated email alerts  
- Real-time system notifications  

---

## 🔐 Non-Functional Requirements
- ⚡ Performance: Fast response (2–3 seconds)  
- 🔒 Security: HTTPS, encrypted passwords, session control  
- 🎨 Usability: Simple and user-friendly interface  
- 🛡️ Reliability: 99% uptime with backup and recovery  
- 📱 Compatibility: Desktop, tablet, and mobile  
- 📈 Scalability: Supports multiple hospitals and large data  

---

## 🛠️ Technologies Used
- Frontend: HTML, CSS, JavaScript / React  
- Design: Figma (mid-fidelity prototype)  

---

## 🚀 How to Use
1. Login using your assigned role
   - For system admin use
     username : admin
     password: admin123
     
   - For Inventory Manager use
     username : manager
     password: 1234
     
   - For Inventory Manager use
     username : manager
     password: 1234
     
   - For Hospital Staff use
     username : staff
     password: 1234
     
   - For Supplier use
     username : supplier
     password: 1234
     
3. Navigate to the dashboard  
4. Manage or view inventory based on your permissions  
5. Receive alerts and take actions (order, update, etc.)

---
## ⚙️ Setup and Installation

Follow these steps to run the project locally on your machine:

📥 1. Clone the Repository
```bash
git clone <your-repository-url>
cd makhzan-website
```
📦 2. Install Dependencies

Make sure you have Node.js installed, then run:
```bash
npm install
```
▶️ 3. Start the Development Server
```bash
npm run dev
```
🌐 4. Open the Application

After starting the server, open the link shown in the terminal, usually:
http://localhost:5173

## 🔧 Backend Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Inside the `backend` folder, your `.env` file should contain:
```
MONGO_URL=your_mongodb_atlas_connection_string
PORT=3000
```

### 3. Start the Backend Server
```bash
node server.js
```
You should see:
```
Server running on port 3000
MongoDB connected
```

⚠️ 5. Windows PowerShell Fix (if needed)

If you encounter a script execution error, run:
```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
---
## 🚀 Deployment

This project is deployed using **GitHub Actions**.

### 🔧 How it works
- Deployment is triggered automatically on every push to the `main` branch.
- GitHub Actions runs a workflow defined in:
- .github/workflows/main.yml
  - The workflow uses the **Phase6 environment** configured in GitHub.

### 🌐 Live Application
Add your deployed link here:
.github/workflows/main.yml

### 🔐 Environment Configuration
- Deployment uses GitHub **Environments**
- Secrets (if any) are stored securely in:
Settings → Environments → Phase6
  
### ▶️ Running Deployment
To trigger deployment manually:
```bash
git push origin main
