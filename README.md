# ☁️ Mini-Drive — File Upload & Sharing Platform

Mini-Drive is a lightweight cloud file storage and sharing application where users can upload files, store them securely, and download them later — similar to a simplified version of **Google Drive / Dropbox**.

Built with **Node.js, Express, MongoDB, and Cloudinary**, this project demonstrates authentication, file handling, cloud storage, and MVC architecture.

---

## 🚀 Features

- 👤 User Registration & Login  
- 🔐 Authentication middleware protection  
- 📤 File upload to Cloudinary  
- 📁 File storage metadata in MongoDB  
- ⬇️ File download functionality  
- 📄 EJS-based dynamic frontend  
- 🧱 MVC structured backend  

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Backend runtime |
| Express.js | Server framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| Cloudinary | Cloud file storage |
| EJS | Templating engine |
| Express Sessions / Auth Middleware | User authentication |

---

## Live link
https://minidrive-1.onrender.com/

---

## 📂 Project Structure

```
Mini-Drive
│
├── config
│   ├── cloudinary.config.js   → Cloudinary setup
│   └── db.js                  → MongoDB connection
│
├── middlewares
│   └── authe.js               → Authentication middleware
│
├── models
│   ├── files.model.js         → File schema
│   └── user.model.js          → User schema
│
├── routes
│   ├── index.routes.js        → Main routes
│   └── user.routes.js         → User routes
│
├── views
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── download.ejs
│   └── files/partial.ejs
│
├── app.js                     → Main server file
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd Mini-Drive
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create Environment Variables

Create a `.env` file in the root:

```
PORT=3000
MONGODB_URL=your_mongodb_connection_string

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SESSION_SECRET=your_session_secret
```

---

### 4️⃣ Run the Server
```bash
npm start
```

App will run on:
```
http://localhost:3000
```

---

## 🔐 Security Features

- Protected routes using middleware  
- Secure session handling  
- Cloud-based file storage (no local file exposure)  

---

## 📌 Learning Highlights

This project demonstrates:

- File upload handling in Node.js  
- Cloud storage integration  
- MVC backend structure  
- Authentication flow  
- Database + cloud storage synchronization  

---


## 👨‍💻 Author

**Rajan Kumar**  
Full Stack Developer  

---

## 📜 License
This project is built for learning and portfolio purposes.
