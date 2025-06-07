import React, { useState } from "react";
import { Button } from "@/components/admin_ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin_ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/admin_ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin_ui/table";
import { Input } from "@/components/admin_ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/admin_ui/select";
import { Badge } from "@/components/admin_ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/admin_ui/dialog";
import {
  Plane,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Clock,
  Search,
  TrendingDown,
  Wallet,
  HandCoins,
  PlaneTakeoff,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Booking {
  flight_uuid: string;
  passenger: string;
  origin: string;
  destination: string;
  price: number;
}

interface Flight {
  flight_uuid: string;
  origin: string;
  destination: string;
  aircraft: string;
  departure: string;
  status: string;
}

interface Aircraft {
  id: number;
  model: string;
  capacity: number;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAddFlightOpen, setIsAddFlightOpen] = useState(false);
  const [stats, setStats] = useState([
    {
      title: "Total Bookings Today",
      value: "...",
      change: "...",
      icon: Users,
      color: "blue",
    },
    {
      title: "Revenue Today",
      value: "...",
      change: "...",
      icon: HandCoins,
      color: "green",
    },
    {
      title: "Active Flights Today",
      value: "...",
      change: "...",
      icon: PlaneTakeoff,
      color: "red",
    },
  ]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);

  const [flights, setFlights] = useState<Flight[]>([]);

  const [aircraft, setAircraft] = useState<Aircraft[]>([]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "active":
      case "on time":
        return "success";
      case "pending":
      case "maintenance":
        return "warning";
      case "cancelled":
      case "delayed":
        return "danger";
      case "boarding":
        return "info";
      default:
        return "default";
    }
  };

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage flights, bookings, and airline operations
          </p>
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
                      {parseFloat(stat.change) >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${
                          parseFloat(stat.change) >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stat.change}%
                      </span>
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
                      <CardTitle>Today's Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentBookings.length === 0 ? (
                          <div className="text-gray-500 text-lg">
                            No bookings today.
                          </div>
                        ) : (
                          recentBookings.map((booking) => (
                            <div
                              key={booking.flight_uuid}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div>
                                <div className="font-medium">
                                  {booking.passenger ?? "Unknown Passenger"}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div>
                                    {booking.origin ?? "N/A"} -{" "}
                                    {booking.destination ?? "N/A"}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">{booking.price}</div>
                              </div>
                            </div>
                          ))
                        )}
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
                        {flights.length === 0 ? (
                          <div className="text-gray-500 text-lg">
                            No flights today.
                          </div>
                        ) : (
                          flights.map((flight) => (
                            <div
                              key={flight.flight_uuid}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div>
                                <div className="font-medium">
                                  {flight.flight_uuid}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {flight.origin} - {flight.destination}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {flight.aircraft}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">
                                  {flight.departure}
                                </div>
                                <Badge
                                  variant={getStatusBadgeVariant(flight.status)}
                                >
                                  {flight.status}
                                </Badge>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="flights">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Flight Management</h2>
                    <Dialog
                      open={isAddFlightOpen}
                      onOpenChange={setIsAddFlightOpen}
                    >
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
                            <label className="text-sm font-medium">
                              Flight Number
                            </label>
                            <Input placeholder="e.g., QA101" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Origin
                              </label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select origin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="nyc">
                                    New York (NYC)
                                  </SelectItem>
                                  <SelectItem value="lax">
                                    Los Angeles (LAX)
                                  </SelectItem>
                                  <SelectItem value="lon">
                                    London (LON)
                                  </SelectItem>
                                  <SelectItem value="par">
                                    Paris (PAR)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Destination
                              </label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="nyc">
                                    New York (NYC)
                                  </SelectItem>
                                  <SelectItem value="lax">
                                    Los Angeles (LAX)
                                  </SelectItem>
                                  <SelectItem value="lon">
                                    London (LON)
                                  </SelectItem>
                                  <SelectItem value="par">
                                    Paris (PAR)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Aircraft
                            </label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select aircraft" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="b787">
                                  Boeing 787 (QA-001)
                                </SelectItem>
                                <SelectItem value="a350">
                                  Airbus A350 (QA-002)
                                </SelectItem>
                                <SelectItem value="b777">
                                  Boeing 777 (QA-003)
                                </SelectItem>
                                <SelectItem value="a380">
                                  Airbus A380 (QA-004)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Departure Date
                              </label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Departure Time
                              </label>
                              <Input type="time" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsAddFlightOpen(false)}
                          >
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
                          <TableHead>Flight ID</TableHead>
                          <TableHead>Aircraft</TableHead>
                          <TableHead>Origin</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Departure</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {flights.map((flight) => (
                          <TableRow key={flight.flight_uuid}>
                            <TableCell className="font-medium">
                              {flight.flight_uuid}
                            </TableCell>
                            <TableCell>{flight.aircraft}</TableCell>
                            <TableCell>{flight.origin}</TableCell>
                            <TableCell>{flight.destination}</TableCell>
                            <TableCell>{flight.departure}</TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusBadgeVariant(flight.status)}
                              >
                                {flight.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 border-red-500"
                                >
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
                          <TableHead>Flight ID</TableHead>
                          <TableHead>Passenger</TableHead>
                          <TableHead>Origin</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentBookings.map((booking) => (
                          <TableRow key={booking.flight_uuid}>
                            <TableCell className="font-medium">
                              {booking.flight_uuid}
                            </TableCell>
                            <TableCell>{booking.passenger}</TableCell>
                            <TableCell>{booking.origin}</TableCell>
                            <TableCell>{booking.destination}</TableCell>
                            <TableCell>{booking.price}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 border-red-500"
                                >
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
                          <label className="text-sm font-medium">
                            Manufacturer
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select manufacturer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="boeing">Boeing</SelectItem>
                              <SelectItem value="airbus">Airbus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Model</label>
                          <Input placeholder="e.g., 787, 777" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Seat Map
                          </label>
                          <textarea
                            className="w-full min-h-[120px] border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Paste JSON seat map here"
                          />
                        </div>
                        <Button className="w-full">Add Aircraft</Button>
                      </CardContent>
                    </Card>

                    {/* Current Fleet */}
                    <Card>
                      <CardHeader>
                        <CardTitle> Aircrafts </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {aircraft.map((aircraft) => (
                            <div
                              key={aircraft.id}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div>
                                <div className="font-medium">
                                  ID: {aircraft.id}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {aircraft.model}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {aircraft.capacity} seats
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
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
  );
}
