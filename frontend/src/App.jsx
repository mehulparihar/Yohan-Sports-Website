import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import EventsPage from "./pages/EventsPage"
import BlogsPage from "./pages/BlogsPage"
import TestimonialsPage from "./pages/TestimonialsPage"
import TrainTheTrainersPage from "./pages/TrainTheTrainersPage"
import InfrastructurePage from "./pages/InfrastructurePage"
import PayAndPlayPage from "./pages/PayAndPlayPage"
import InSchoolProgram from "./pages/InSchoolProgram"
import ContactUs from "./pages/ContactUs"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import useStore from "./stores"
import BlogPage from "./pages/BlogPage"
import {React, useEffect} from "react"


function App() {

  const {user} = useStore();


  return (
    <div>
      <Routes>
        <Route path = '/' element = {<HomePage/>}/>
        <Route path = '/about' element = {<AboutPage/>}/>
        <Route path = '/events' element = {<EventsPage/>} />
        <Route path = '/blogs' element = {<BlogsPage/>} />
        <Route path = '/testimonials' element = {<TestimonialsPage/>} />
        <Route path = '/train-the-trainers' element = {<TrainTheTrainersPage/>} />
        <Route path = '/infrastructure' element = {<InfrastructurePage/>} />
        <Route path = '/pay-and-play' element = {<PayAndPlayPage/>} />
        <Route path = '/blogs/:slug' element={<BlogPage/>} />
        <Route path = '/in-school-program' element = {<InSchoolProgram/>} />
        <Route path = '/contact' element = {<ContactUs/>} />
        <Route path = '/admin/login' element = {<LoginPage/>} />
        <Route path = '/admin/dashboard' element = {user?.role === "admin" ? <DashboardPage/> : <Navigate to = '/admin/login'/>} />
      </Routes>
    </div>
  )
}

export default App
