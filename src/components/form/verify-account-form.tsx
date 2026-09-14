"use client"

import { useSearchParams } from "next/navigation"

const VerifyAccountForm = () => {

    const searchParams = useSearchParams();

    console.log(searchParams)

  return (
    <div>verify-account-form</div>
  )
}

export default VerifyAccountForm