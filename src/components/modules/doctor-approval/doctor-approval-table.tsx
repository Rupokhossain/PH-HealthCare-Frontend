import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDoctors, useSuspenseGetAllDoctors } from "@/hooks";
import { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Dispatch, SetStateAction } from "react";


interface Props extends DoctorParams{
    handleReview: Dispatch<SetStateAction<string>>;
}

const DoctorApprovalTable = ({handleReview, 
    ...params
} : Props) => {

const {data, isPending} = useSuspenseGetAllDoctors(params);

    const doctors = data?.data || [];

    if(isPending) {
        return <p>Loading...</p>
    }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.licenseNumber}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>
                {doctor.contactNumber ? doctor.contactNumber : "-"}
              </TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell className="text-right">
                    <Button variant="outline"
                    onClick={() => handleReview(doctor.id)}
                    >Review</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DoctorApprovalTable