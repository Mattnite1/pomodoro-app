// "use client"

// import { Button } from "../ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"

// export function CreateAccountView() {
//   return (
//     <Card>
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl">Create an account</CardTitle>
//         <CardDescription>
//           Enter your email below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t" />
//           </div>
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" type="email" placeholder="m@example.com" />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" type="password" />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="username">Username</Label>
//           <Input id="username" type="username" />
//         </div>
//         <div className="flex flex-row">
//         <div className="w-11/12">
//           <Label htmlFor="firstName">FirstName</Label>
//           <Input id="firstName" type="firstName" />
//         </div>
//         <div className="w-11/12 ">
//           <Label htmlFor="lastName">LastName</Label>
//           <Input id="lastName" type="lastName" />
//         </div>

//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full">Create account</Button>
//       </CardFooter>
//     </Card>
//   )
//   }