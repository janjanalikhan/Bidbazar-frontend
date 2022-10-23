import React from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import DashbordWrap from './DashboardWrap'
import Swal from 'sweetalert2'

function buyerDashboard() {

  return (
    <>
     <Breadcrumb pageName="Dashboard Under Construction" pageTitle="Dashboard Under Construction"/> 
     <DashbordWrap/>
     <AboutUsCounter/>  
    </>
  )
}

export default buyerDashboard