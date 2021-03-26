import React from "react"
import { toast } from "react-toastify"

import Navbar from "../components//Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import "../components/style/layout.scss"
import "react-toastify/dist/ReactToastify.min.css"

toast.configure()

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
