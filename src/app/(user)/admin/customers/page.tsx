// "use client"

// import { useState } from "react"
// import { useAdmin } from "@/contexts/admin-context"
// import { DashboardHeader } from "@/components/admin/dashboard-header"
// import { DataTable } from "@/components/admin/data-table"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Modal } from "@/components/ui/modal"
// // import { useToast } from "@/components/ui/use-toast"
// import { Eye, Mail, Phone, Calendar, ShoppingBag, DollarSign, Filter } from "lucide-react"
// import type { ColumnDef } from "@tanstack/react-table"
// import type { Customer } from "@/contexts/admin-context"
// import Link from "next/link"

// export default function CustomersPage() {
//   // const { customers, updateCustomerStatus} = useAdmin()
//   // const { toast } = useToast()
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
//   const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")

//   const columns: ColumnDef<Customer>[] = [
//     {
//       accessorKey: "name",
//       header: "Customer Name",
//       cell: ({ row }) => (
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-[#3A2723] text-white rounded-full flex items-center justify-center text-sm font-medium">
//             {row.original.name.charAt(0).toUpperCase()}
//           </div>
//           <div>
//             <div className="font-medium">{row.original.name}</div>
//             <div className="text-sm text-gray-500">{row.original.email}</div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       accessorKey: "phone",
//       header: "Phone",
//       cell: ({ row }) => row.original.phone || "Not provided",
//     },
//     {
//       accessorKey: "registrationDate",
//       header: "Registration Date",
//       cell: ({ row }) => new Date(row.original.registrationDate).toLocaleDateString(),
//     },
//     {
//       accessorKey: "totalOrders",
//       header: "Total Orders",
//       cell: ({ row }) => (
//         <div className="flex items-center space-x-1">
//           <ShoppingBag className="h-4 w-4 text-gray-500" />
//           <span>{row.original.totalOrders}</span>
//         </div>
//       ),
//     },
//     {
//       accessorKey: "totalSpent",
//       header: "Total Spent",
//       cell: ({ row }) => (
//         <div className="flex items-center space-x-1">
//           <DollarSign className="h-4 w-4 text-gray-500" />
//           <span>₹{row.original.totalSpent.toLocaleString()}</span>
//         </div>
//       ),
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => (
//         <Badge variant={row.original.status === "active" ? "default" : "secondary"}>{row.original.status}</Badge>
//       ),
//     },
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => (
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               setSelectedCustomer(row.original)
//               setIsProfileModalOpen(true)
//             }}
//           >
//             <Eye className="h-4 w-4 mr-1" />
//             View
//           </Button>
//           <Button variant="outline" size="sm" onClick={() => handleStatusToggle(row.original)}>
//             {row.original.status === "active" ? "Deactivate" : "Activate"}
//           </Button>
//         </div>
//       ),
//     },
//   ]

//   const handleStatusToggle = async (customer: Customer) => {
//     const newStatus = customer.status === "active" ? "inactive" : "active"
//     // await updateCustomerStatus(customer.id, newStatus)
//   }

//   // const filteredCustomers = customers.filter((customer) => {
//   //   if (filterStatus === "all") return true
//   //   return customer.status === filterStatus
//   // })

//   const stats = {
//     total: customers.length,
//     active: customers.filter((c) => c.status === "active").length,
//     inactive: customers.filter((c) => c.status === "inactive").length,
//     totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
//   }

//   return (
//     <div className="space-y-6">
//       <DashboardHeader title="Customer Management" description="Manage your customers and view their profiles" />

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.total}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{stats.active}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Inactive Customers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Customer List</CardTitle>
//             <div className="flex items-center space-x-2">
//               <Filter className="h-4 w-4 text-gray-500" />
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value as any)}
//                 className="border rounded px-3 py-1 text-sm"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <DataTable
//             columns={columns}
//             data={filteredCustomers}
//             searchKey="name"
//             searchPlaceholder="Search customers..."
//           />
//         </CardContent>
//       </Card>

//       {/* Customer Profile Modal */}
//       <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="Customer Profile">
//         {selectedCustomer && (
//           <div className="space-y-6">
//             {/* Customer Info */}
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-[#3A2723] text-white rounded-full flex items-center justify-center text-xl font-bold">
//                 {selectedCustomer.name.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
//                 <p className="text-gray-600">{selectedCustomer.email}</p>
//                 <Badge variant={selectedCustomer.status === "active" ? "default" : "secondary"}>
//                   {selectedCustomer.status}
//                 </Badge>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label className="text-sm font-medium">Contact Information</Label>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <Mail className="h-4 w-4 text-gray-500" />
//                     <span className="text-sm">{selectedCustomer.email}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Phone className="h-4 w-4 text-gray-500" />
//                     <span className="text-sm">{selectedCustomer.phone || "Not provided"}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="h-4 w-4 text-gray-500" />
//                     <span className="text-sm">
//                       Joined {new Date(selectedCustomer.registrationDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-sm font-medium">Order Statistics</Label>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Total Orders:</span>
//                     <span className="text-sm font-medium">{selectedCustomer.totalOrders}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Total Spent:</span>
//                     <span className="text-sm font-medium">₹{selectedCustomer.totalSpent.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Average Order:</span>
//                     <span className="text-sm font-medium">
//                       ₹
//                       {selectedCustomer.totalOrders > 0
//                         ? Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString()
//                         : 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-2 pt-4 border-t">
//               <Button variant="outline" onClick={() => handleStatusToggle(selectedCustomer)} className="flex-1">
//                 {selectedCustomer.status === "active" ? "Deactivate" : "Activate"} Customer
//               </Button>
//               <Link href={`/admin/orders?customer=${selectedCustomer.id}`}>
//                 <Button className="flex-1">View Orders</Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   )
// }

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
