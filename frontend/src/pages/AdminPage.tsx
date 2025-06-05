import React, { useState } from 'react';
import { Button } from "@/components/admin_ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin_ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin_ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin_ui/table"
import { Input } from "@/components/admin_ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin_ui/select"
import { Badge } from "@/components/admin_ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/admin_ui/dialog"
import { Plane, Users, Settings, Plus, Edit, Trash2, TrendingUp, DollarSign, Clock, Search } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminPage() {
  const [isAddFlightOpen, setIsAddFlightOpen] = useState(false);

  const stats = [
    { title: "Total Bookings", value: "1,247", change: "+12%", icon: Users, color: "blue" },
    { title: "Revenue", value: "$892,450", change: "+8%", icon: DollarSign, color: "green" },
    { title: "Active Flights", value: "23", change: "0%", icon: Plane, color: "orange" },
  ]

  const recentBookings = [
    {
      id: "QA-2024-156",
      passenger: "John Smith",
      flight: "QA101",
      route: "NYC → LON",
      status: "Confirmed",
      amount: "$713",
    },
    {
      id: "QA-2024-157",
      passenger: "Sarah Johnson",
      flight: "QA205",
      route: "LAX → PAR",
      status: "Pending",
      amount: "$849",
    },
    {
      id: "QA-2024-158",
      passenger: "Mike Davis",
      flight: "QA307",
      route: "CHI → TOK",
      status: "Confirmed",
      amount: "$1,299",
    },
    {
      id: "QA-2024-159",
      passenger: "Emily Brown",
      flight: "QA156",
      route: "MIA → SYD",
      status: "Cancelled",
      amount: "$1,199",
    },
  ]

  const flights = [
    { number: "QA101", route: "NYC → LON", aircraft: "Boeing 787", departure: "08:30", status: "On Time" },
    { number: "QA205", route: "LAX → PAR", aircraft: "Airbus A350", departure: "14:20", status: "Delayed" },
    { number: "QA307", route: "CHI → TOK", aircraft: "Boeing 777", departure: "22:10", status: "On Time" },
    { number: "QA156", route: "MIA → SYD", aircraft: "Airbus A380", departure: "16:45", status: "Boarding" },
  ]

  const fleet = [
    { code: "QA-001", model: "Boeing 787-9", seats: "230 (200E + 30B)", status: "Active" },
    { code: "QA-002", model: "Airbus A350", seats: "280 (250E + 30B)", status: "Active" },
    { code: "QA-003", model: "Boeing 777", seats: "350 (300E + 50B)", status: "Maintenance" },
    { code: "QA-004", model: "Airbus A380", seats: "550 (450E + 100B)", status: "Active" },
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'active':
      case 'on time':
        return 'success'
      case 'pending':
      case 'maintenance':
        return 'warning'
      case 'cancelled':
      case 'delayed':
        return 'danger'
      case 'boarding':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-500">
                QAirline Admin
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">View Website</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage flights, bookings, and airline operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4 gap-4 bg-gray-100/50 p-1 rounded-lg mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="flights">Flights</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="aircraft">Aircraft</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Bookings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">{booking.passenger}</div>
                              <div className="text-sm text-gray-600">
                                {booking.flight} • {booking.route}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{booking.amount}</div>
                              <Badge variant={getStatusBadgeVariant(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Today's Flights */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Flights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {flights.map((flight) => (
                          <div key={flight.number} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">{flight.number}</div>
                              <div className="text-sm text-gray-600">{flight.route}</div>
                              <div className="text-xs text-gray-500">{flight.aircraft}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{flight.departure}</div>
                              <Badge variant={getStatusBadgeVariant(flight.status)}>
                                {flight.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="flights">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Flight Management</h2>
                    <Dialog open={isAddFlightOpen} onOpenChange={setIsAddFlightOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Flight
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Flight</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Flight Number</label>
                            <Input placeholder="e.g., QA101" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Origin</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select origin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="nyc">New York (NYC)</SelectItem>
                                  <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                                  <SelectItem value="lon">London (LON)</SelectItem>
                                  <SelectItem value="par">Paris (PAR)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Destination</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="nyc">New York (NYC)</SelectItem>
                                  <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                                  <SelectItem value="lon">London (LON)</SelectItem>
                                  <SelectItem value="par">Paris (PAR)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Aircraft</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select aircraft" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="b787">Boeing 787 (QA-001)</SelectItem>
                                <SelectItem value="a350">Airbus A350 (QA-002)</SelectItem>
                                <SelectItem value="b777">Boeing 777 (QA-003)</SelectItem>
                                <SelectItem value="a380">Airbus A380 (QA-004)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Departure Date</label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Departure Time</label>
                              <Input type="time" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddFlightOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsAddFlightOpen(false)}>
                            Add Flight
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Flight Number</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead>Aircraft</TableHead>
                          <TableHead>Departure</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {flights.map((flight) => (
                          <TableRow key={flight.number}>
                            <TableCell className="font-medium">{flight.number}</TableCell>
                            <TableCell>{flight.route}</TableCell>
                            <TableCell>{flight.aircraft}</TableCell>
                            <TableCell>{flight.departure}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(flight.status)}>
                                {flight.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 border-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bookings">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold"> </h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search bookings..."
                          className="pl-10 w-[300px]"
                        />
                      </div>
                      <Button variant="outline">Export</Button>
                    </div>
                  </div>

                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Passenger</TableHead>
                          <TableHead>Flight</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.passenger}</TableCell>
                            <TableCell>{booking.flight}</TableCell>
                            <TableCell>{booking.route}</TableCell>
                            <TableCell>{booking.amount}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(booking.status)}>
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 border-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="aircraft">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Aircraft Management</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Add Aircraft Form */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Add New Aircraft</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Aircraft Code</label>
                          <Input placeholder="e.g., QA-001" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Manufacturer</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select manufacturer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="boeing">Boeing</SelectItem>
                              <SelectItem value="airbus">Airbus</SelectItem>
                              <SelectItem value="embraer">Embraer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Model</label>
                          <Input placeholder="e.g., 787-9" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Economy Seats</label>
                            <Input type="number" placeholder="200" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Business Seats</label>
                            <Input type="number" placeholder="30" />
                          </div>
                        </div>
                        <Button className="w-full">Add Aircraft</Button>
                      </CardContent>
                    </Card>

                    {/* Current Fleet */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Fleet</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {fleet.map((aircraft) => (
                            <div key={aircraft.code} className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <div className="font-medium">{aircraft.code}</div>
                                <div className="text-sm text-gray-600">{aircraft.model}</div>
                                <div className="text-xs text-gray-500">{aircraft.seats}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={getStatusBadgeVariant(aircraft.status)}>
                                  {aircraft.status}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 