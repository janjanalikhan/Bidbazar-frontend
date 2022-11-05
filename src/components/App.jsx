import React ,{useState, useEffect} from 'react'
import Footer from './common/Footer'
import Header from './common/Header'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import useAuth from './hooks/useAuth'
import { io } from "socket.io-client";
function Layout(props) {





  return (
    <>
     <Header/> 
     <ReactNotifications />
     {<props.page  />}
     <Footer/>  
    </>
  )
}

export default Layout