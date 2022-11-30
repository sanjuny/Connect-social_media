import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar'
import UserManagement from '../../components/Admin/UserManagement/UserManagement'

function UserManagementPage() {
  return (
    <>
      <AdminSidebar />
    <div className=' overflow-hidden pr-10 mt-10 ml-72'>
        <UserManagement />
    </div>
    </>
  )
}

export default UserManagementPage