
import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from '../layouts/MainLayout'
import Home from "../pages/Home";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import MyBookings from "../pages/MyBookings";
import PrivateRoute from "./PrivateRoute";
import Rooms from "../pages/Rooms";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/rooms',
        element: <Rooms></Rooms>
      },
      {
        path: '/MyBookings',
        element:
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }

]);
export default router;