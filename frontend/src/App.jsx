import { Route, Routes } from "react-router-dom"
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
function App() {

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
        <Route path = '/in-school-program' element = {<InSchoolProgram/>} />
        <Route path = '/contact' element = {<ContactUs/>} />
        <Route path = '/admin/login' element = {<LoginPage/>} />
        <Route path = '/admin/dashboard' element = {<DashboardPage/>} />
    

        
      </Routes>
    </div>
  )
}

export default App
