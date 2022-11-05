import React from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import DashbordWrap from './DashboardWrap'
import Swal from 'sweetalert2'

function buyerDashboard() {

  return (
    <>
     <Breadcrumb pageName="Dashboard Buyer" pageTitle="Dashboard Buyer"/> 
     <DashbordWrap/>
     {/* <AboutUsCounter/>   */}
    </>
  )
}

export default buyerDashboard