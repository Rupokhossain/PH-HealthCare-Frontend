import DoctorApprovalTabs from '@/components/modules/doctor-approval/doctor-approval-tabs'

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