
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<NotFound></NotFound>,
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
        path: '/roomDetails/:id',
        element: <RoomDetails></RoomDetails>,
        loader: ({ params }) => fetch(`http://localhost:4000/rooms/${params.id}`)

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