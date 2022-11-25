import React from 'react'
import AdminDashboard from '../../components/Admin/AdminDashboard/AdminDashboard'
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar'

function AdminDashboardPage() {
  return (
    <div>
        <AdminSidebar />
        <AdminDashboard />
    </div>
  )
}

export default AdminDashboardPage