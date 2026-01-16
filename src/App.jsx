import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Jobs from "./pages/Jobs"
import Pricing  from "./pages/Pricing"
import Profile from "./pages/Profile"
import SavedJobs from "./pages/SavedJobs"
import Signup from "./pages/Signup"
import Layout from "./components/layout/Layout" 
import NotFound from "./pages/NotFound"
function App() {
  return (
   
  <Layout>
    <Routes>
      
        <Route index element={<Home/>}/>
        <Route path="/Jobs" element={<Jobs/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/profile" element={<Profile/>} />
       
        <Route path="/signup" element={<Signup />} />
      <Route path="/savedjobs" element={<SavedJobs />} />
      <Route path="*" element={<NotFound />} />  {/* 404 catch-all */}
      </Routes>
      
      </Layout>
      
    
  )
}

export default App
