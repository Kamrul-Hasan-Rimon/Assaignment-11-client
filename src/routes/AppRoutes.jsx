
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
import RoomDetails from "../pages/RoomDetails";
import ReviewModal from "../pages/ReviewModal";
import NotFound from "../components/Common/NotFound";
import About from "../components/Common/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: '/',
        element: <Home></Home>


      },
      {
        path: '/Rooms',
        element: <Rooms></Rooms>
      },
      {
        path: '/About',
        element: <About></About>
      },
      {
        path: '/roomDetails/:id',
        element:
          <PrivateRoute>
            <RoomDetails></RoomDetails>
          </PrivateRoute>,
        loader: ({ params }) => fetch(`https://modern-hotel-server.vercel.app/rooms/${params.id}`)

      },
      {
        path: '/MyBookings',
        element:
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>,
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