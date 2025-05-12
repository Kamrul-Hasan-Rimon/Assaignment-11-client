// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/AppRoutes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./components/context/AuthProvider.jsx";
import { ThemeProvider } from "./components/context/ThemeProvider.jsx"; // Make sure this path is correct

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);