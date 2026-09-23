import DoctorApprovalTabs from '@/components/modules/auth/doctor-approval/doctor-approval-tabs'
import React from 'react'

const page = () => {
  return (
    <div>
      <div>
        <h1>Doctor approval</h1>
        <p>Please review and make sure the given data is real</p>
      </div>
      <DoctorApprovalTabs/>
    </div>
  )
}

export default page