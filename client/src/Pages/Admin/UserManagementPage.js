import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar'
import UserManagement from '../../components/Admin/UserManagement/UserManagement'

function UserManagementPage() {
  return (
    <div>
        <AdminSidebar />
        <UserManagement />
    </div>
  )
}

export default UserManagementPage