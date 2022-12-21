import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar'
import ReportPost from '../../components/Admin/ReportPost/ReportPost'

function ReportPostPage() {
  return (
    <>
      <AdminSidebar />
      <div className=' overflow-hidden pr-10 mt-10 ml-72'>
        <ReportPost />
      </div>
    </>
  )
}

export default ReportPostPage