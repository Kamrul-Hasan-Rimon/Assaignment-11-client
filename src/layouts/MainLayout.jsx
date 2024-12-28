import React from 'react'
import Navbar from '../components/Common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Common/Footer'
import { Toaster } from 'react-hot-toast'
export default function MainLayout() {
  return (
    <div>
      <Toaster  position="top-right" />
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}
