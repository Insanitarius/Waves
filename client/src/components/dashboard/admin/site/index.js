import React from 'react'
import DashboardLayout from '../../../../hoc/dashboardLayout'
import SiteVars from './siteVars'


const ManageSite = () => {
    return (
        <DashboardLayout title ="Manage Site">
            <hr/>
            <SiteVars />
        </DashboardLayout>
    )
}

export default ManageSite
