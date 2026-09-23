
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DoctorApprovalTabs = () => {
  return (
    <Tabs defaultValue="pending" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="pending">Pending</TabsTrigger>
    <TabsTrigger value="approved">Approved</TabsTrigger>
    <TabsTrigger value="rejected">Rejected</TabsTrigger>
    <TabsTrigger value="all">All</TabsTrigger>
  </TabsList>
  <TabsContent value="pending">Pending Table</TabsContent>
  <TabsContent value="approved">Approved Table</TabsContent>
  <TabsContent value="rejected">Rejected Table</TabsContent>
  <TabsContent value="all">All Table</TabsContent>
</Tabs>
  )
}

export default DoctorApprovalTabs