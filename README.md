# 🏨 Modern Hotel Project

**Modern Hotel** is a full-stack web application that streamlines hotel booking experiences for both customers and administrators. With a modern UI, secure authentication, real-time availability, and smart filtering, it offers a seamless hotel reservation platform.

---

## 🔗 Live Demo

👉 [Visit the Live Website](https://modern-hotel-3e21d.web.app/)  
*(Replace with your actual URL if different)*

---

## 🎯 Purpose

This project is designed to:
- Simplify hotel bookings through a user-friendly interface.
- Enable real-time room availability and secure transactions.
- Provide a responsive experience for all devices.
- Support both customers and hotel administrators.

---

## 🚀 Features

### 🧑‍💼 User-Side
- 🔐 **Authentication** – Sign up & login securely with Firebase.
- 🔍 **Search Hotels** – Filter by location, price, and amenities.
- 📆 **Book Instantly** – Real-time room availability check.
- ⭐ **Ratings & Reviews** – Share and view hotel experiences.
- 🌙 **Dark/Light Mode** – Switch between light and dark themes.
- 📱 **Responsive Design** – Works on all screen sizes.
- 🧾 **Booking History** – View past and upcoming reservations.
- 🔎 **Smart Filters** – Refine results with detailed filters.

### 🛠️ Admin-Side *(optional/future enhancement)*
- Hotel and room management
- Review moderation
- Booking insights and analytics

---

## 🧰 Tech Stack

### Frontend
- React
- Tailwind CSS
- Daisy UI
- React Router DOM
- Mapbox

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- CORS

### Authentication
- Firebase Authentication (email/password)

### Deployment
- **Frontend**: Firebase Hosting  
- **Backend**: Vercel

---

## 📦 NPM Packages

| Package            | Description                              |
|--------------------|------------------------------------------|
| `react`            | UI library for building components       |
| `tailwindcss`      | Utility-first CSS framework              |
| `daisyui`          | Tailwind UI components                   |
| `react-router-dom` | Client-side routing                      |
| `axios`            | Promise-based HTTP client                |
| `datepicker`       | Calendar component for date picking      |
| `jsonwebtoken`     | JWT generation and verification          |
| `bcryptjs`         | Password hashing                         |
| `dotenv`           | Environment variable management          |
| `mongoose`         | MongoDB object modeling                  |
| `cors`             | Enable CORS in backend                   |
| `mapbox-gl`        | Map integration in the frontend          |

---

## 📁 Project Structure

/client
├── public
├── src
│ ├── assets
│ ├── components
│ ├── pages
│ ├── routes
│ ├── hooks
│ ├── contexts
│ └── App.jsx

/server
├── config
├── controllers
├── models
├── routes
├── middleware
└── server.js


---

## 🛠️ Getting Started

```bash
# Clone the project
git clone https://github.com/your-username/modern-hotel.git
cd modern-hotel

# Frontend setup
cd client
npm install
npm run dev

# Backend setup
cd ../server
npm install
npm run dev
```

📌 Future Improvements
-Admin dashboard

-PWA support

-Email/SMS notifications

-Multi-language support

-Booking analytics

🙌 Credits
Developed with ❤️ by [KAMRUL HASAN]
📧 lnahar@gmail.com | 🌐 Your Portfolio
