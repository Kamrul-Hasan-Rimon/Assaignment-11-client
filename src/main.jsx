import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
import router from './routes/AppRoutes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './components/context/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
=======
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
>>>>>>> 7bc40638d475e70bc801c2ace5178b1769d416b7
)
