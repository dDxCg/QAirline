import React, { useEffect, useState } from "react";
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
import { initSocket } from "@/services/socket";
import { isAdmin } from "@/utils/authUtils";
import planeServices from "@/services/planeServices";
import flightServices from "@/services/flightServices";

interface Booking {
  flight_uuid: string;
  passenger: string;
  origin: string;
  destination: string;
  price: number;
  book_at: string;
}

interface Flight {
  flight_uuid: string;
  origin: string;
  destination: string;
  plane_id: number;
  aircraft: string;
  departure_time: string;
  arrival_time: string;
  status: string;
}

interface Aircraft {
  id?: number;
  model: string;
  capacity: number;
  manufacturer: string;
  seat_map: string;
}

interface NewFlight {
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  plane_id: number;
  economy_price: number;
  premium_economy_price: number;
  business_price: number;
  first_class_price: number;
}

interface DashboardStat {
  booking_today: number;
  revenue_today: number;
  active_flights_today: number;
  booking_change: number;
  revenue_change: number;
  active_flights_change: number;
}

export default function AdminPage() {
  const navigate = useNavigate();
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
  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [flights, setFlights] = useState<Flight[]>([]);

  const [todayFlights, setTodayFlights] = useState<Flight[]>([]);

  const [aircraft, setAircraft] = useState<Aircraft[]>([]);

  const [newAircraft, setNewAircraft] = useState<Aircraft>();
  const [newFlight, setNewFlight] = useState<NewFlight>();

  const [dashboardStats, setDashboardStats] = useState<DashboardStat | null>(
    null
  );

  useEffect(() => {
    if (!isAdmin()) {
      return;
    }
    const socket = initSocket();
    socket.emit("adminReady");

    socket.on("dashboardUpdate", (data: DashboardStat) => {
      console.log("Received dashboard update:", data);
      setDashboardStats(data);
      setStats((prevStats) => [
        {
          ...prevStats[0],
          value: data.booking_today.toString(),
          change: data.booking_change.toString(),
        },
        {
          ...prevStats[1],
          value: data.revenue_today.toString(),
          change: data.revenue_change.toString(),
        },
        {
          ...prevStats[2],
          value: data.active_flights_today.toString(),
          change: data.active_flights_change.toString(),
        },
      ]);
    });

    socket.on("aircraftUpdate", (data: Aircraft[]) => {
      console.log("Received aircraft update:", data);
      setAircraft(data);
      console.log("Updated aircraft:", aircraft);
    });

    socket.on("flightsUpdate", (data: Flight[]) => {
      console.log("Received flight update:", data);
      setFlights(data);
      setTodayFlights(
        data.filter((flight) => {
          const departureDate = new Date(flight.departure_time);
          const today = new Date();
          return (
            departureDate.getDate() === today.getDate() &&
            departureDate.getMonth() === today.getMonth() &&
            departureDate.getFullYear() === today.getFullYear()
          );
        })
      );
      console.log("Filtered today's flights:", todayFlights);
      console.log("All flights:", flights);
    });

    socket.on("bookingsUpdate", (data: Booking[]) => {
      console.log("Received recent bookings update:", data);
      setBookings(data);
      setTodayBookings(
        data.filter((booking) => {
          const bookingDate = new Date(booking.book_at);
          const today = new Date();
          return (
            bookingDate.getDate() === today.getDate() &&
            bookingDate.getMonth() === today.getMonth() &&
            bookingDate.getFullYear() === today.getFullYear()
          );
        })
      );
      console.log("Filtered today's bookings:", todayBookings);
      console.log("All bookings:", bookings);
    });

    return () => {
      socket.off("dashboardUpdate");
    };
  }, []);

  const createAircraftHandler = () => {
    if (!newAircraft) {
      console.error("New aircraft data is not set");
      return;
    }

    planeServices
      .createPlane(newAircraft)
      .then((response) => {
        console.log("Aircraft created successfully:", response);
        setNewAircraft(undefined);
      })
      .catch((error) => {
        console.error("Error creating aircraft:", error);
      });
  };
  const createFlightHandler = () => {
    if (!newFlight) {
      console.error("New flight data is not set");
      return;
    }
    flightServices
      .createFlight(newFlight)
      .then((response) => {
        console.log("Flight created successfully:", response);
        setNewFlight(undefined);
      })
      .catch((error) => {
        console.error("Error creating flight:", error);
      });
    setIsAddFlightOpen(false);
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
            <Button
              variant="outline"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Log Out
            </Button>
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
                        {stat.change}
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
                        {todayBookings.length === 0 ? (
                          <div className="text-gray-500 text-lg">
                            No bookings today.
                          </div>
                        ) : (
                          todayBookings.map((booking) => (
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
                                  Flight ID: {flight.flight_uuid}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {flight.origin} - {flight.destination}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {flight.aircraft} (ID: {flight.plane_id})
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">
                                  {flight.departure_time}
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
                              Aircraft ID
                            </label>
                            {/* Plane ID Input*/}
                            <Input
                              type="text"
                              placeholder="Enter aircraft ID"
                              value={newFlight?.plane_id ?? 0}
                              onChange={(e) =>
                                setNewFlight((prev) => ({
                                  ...(prev || {
                                    origin: "",
                                    destination: "",
                                    departureTime: "",
                                    arrivalTime: "",
                                    plane_id: 0,
                                    economy_price: 0,
                                    premium_economy_price: 0,
                                    business_price: 0,
                                    first_class_price: 0,
                                  }),
                                  plane_id: Number(e.target.value),
                                }))
                              }
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Origin
                              </label>
                              {/* Input Origin */}
                              <Input
                                type="text"
                                placeholder="From"
                                value={newFlight?.origin || ""}
                                onChange={(e) =>
                                  setNewFlight((prev) => ({
                                    ...(prev || {
                                      origin: "",
                                      destination: "",
                                      departureTime: "",
                                      arrivalTime: "",
                                      plane_id: 0,
                                      economy_price: 0,
                                      premium_economy_price: 0,
                                      business_price: 0,
                                      first_class_price: 0,
                                    }),
                                    origin: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Destination
                              </label>
                              {/* Input Destination */}
                              <Input
                                type="text"
                                placeholder="To"
                                value={newFlight?.destination || ""}
                                onChange={(e) =>
                                  setNewFlight((prev) => ({
                                    ...(prev || {
                                      origin: "",
                                      destination: "",
                                      departureTime: "",
                                      arrivalTime: "",
                                      plane_id: 0,
                                      economy_price: 0,
                                      premium_economy_price: 0,
                                      business_price: 0,
                                      first_class_price: 0,
                                    }),
                                    destination: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Departure Time
                              </label>
                              <div className="flex gap-2">
                                <Input
                                  type="datetime-local"
                                  value={newFlight?.departureTime || ""}
                                  onChange={(e) =>
                                    setNewFlight((prev) => ({
                                      ...(prev || {
                                        origin: "",
                                        destination: "",
                                        departureTime: "",
                                        arrivalTime: "",
                                        plane_id: 0,
                                        economy_price: 0,
                                        premium_economy_price: 0,
                                        business_price: 0,
                                        first_class_price: 0,
                                      }),
                                      departureTime: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Arrival Time
                              </label>
                              <div className="flex gap-2">
                                <Input
                                  type="datetime-local"
                                  value={newFlight?.arrivalTime || ""}
                                  onChange={(e) =>
                                    setNewFlight((prev) => ({
                                      ...(prev || {
                                        origin: "",
                                        destination: "",
                                        departureTime: "",
                                        arrivalTime: "",
                                        plane_id: 0,
                                        economy_price: 0,
                                        premium_economy_price: 0,
                                        business_price: 0,
                                        first_class_price: 0,
                                      }),
                                      arrivalTime: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          {/* Price input */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Economy Price
                              </label>
                              <Input
                                type="number"
                                min={0}
                                value={newFlight?.economy_price ?? ""}
                                onChange={(e) =>
                                  setNewFlight((prev) => ({
                                    ...(prev || {
                                      origin: "",
                                      destination: "",
                                      departureTime: "",
                                      arrivalTime: "",
                                      plane_id: 0,
                                      economy_price: 0,
                                      premium_economy_price: 0,
                                      business_price: 0,
                                      first_class_price: 0,
                                    }),
                                    economy_price: Number(e.target.value),
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Premium Economy Price
                              </label>
                              <Input
                                type="number"
                                min={0}
                                value={newFlight?.premium_economy_price ?? ""}
                                onChange={(e) =>
                                  setNewFlight((prev) => ({
                                    ...(prev || {
                                      origin: "",
                                      destination: "",
                                      departureTime: "",
                                      arrivalTime: "",
                                      plane_id: 0,
                                      economy_price: 0,
                                      premium_economy_price: 0,
                                      business_price: 0,
                                      first_class_price: 0,
                                    }),
                                    premium_economy_price: Number(
                                      e.target.value
                                    ),
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Business Price
                              </label>
                              <Input
                                type="number"
                                min={0}
                                value={newFlight?.business_price ?? ""}
                                onChange={(e) =>
                                  setNewFlight((prev) => ({
                                    ...(prev || {
                                      origin: "",
                                      destination: "",
                                      departureTime: "",
                                      arrivalTime: "",
                                      plane_id: 0,
                                      economy_price: 0,
                                      premium_economy_price: 0,
                                      business_price: 0,
                                      first_class_price: 0,
                                    }),
                                    business_price: Number(e.target.value),
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                First Class Price
                              </label>
                              <Input
                                type="number"
                                min={0}
                                value={newFlight?.first_class_price ?? ""}
                                onChange={(e) =>
                                  setNewFlight((prev) => ({
                                    ...(prev || {
                                      origin: "",
                                      destination: "",
                                      departureTime: "",
                                      arrivalTime: "",
                                      plane_id: 0,
                                      economy_price: 0,
                                      premium_economy_price: 0,
                                      business_price: 0,
                                      first_class_price: 0,
                                    }),
                                    first_class_price: Number(e.target.value),
                                  }))
                                }
                              />
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
                          <Button onClick={createFlightHandler}>
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
                            <TableCell>
                              {flight.aircraft} ({flight.plane_id})
                            </TableCell>
                            <TableCell>{flight.origin}</TableCell>
                            <TableCell>{flight.destination}</TableCell>
                            <TableCell>{flight.departure_time}</TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusBadgeVariant(flight.status)}
                              >
                                {flight.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
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
                    <h2 className="text-2xl font-bold"> Booking Management</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search passenger name"
                          className="pl-10 w-[300px]"
                        />
                      </div>
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
                        {todayBookings.map((booking) => (
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
                          <Select
                            value={newAircraft?.manufacturer || ""}
                            onValueChange={(value) =>
                              setNewAircraft((prev) => ({
                                ...(prev || {
                                  model: "",
                                  capacity: 0,
                                  manufacturer: "",
                                  seat_map: "",
                                }),
                                manufacturer: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select manufacturer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Boeing">Boeing</SelectItem>
                              <SelectItem value="Airbus">Airbus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Model</label>
                          <Input
                            placeholder="e.g., 787, 777"
                            value={newAircraft?.model || ""}
                            onChange={(e) =>
                              setNewAircraft((prev) => ({
                                ...(prev || {
                                  model: "",
                                  capacity: 0,
                                  manufacturer: "",
                                  seat_map: "",
                                }),
                                model: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Capacity
                          </label>
                          <Input
                            type="number"
                            min={0}
                            value={newAircraft?.capacity || ""}
                            onChange={(e) =>
                              setNewAircraft((prev) => ({
                                ...(prev || {
                                  model: "",
                                  capacity: 0,
                                  manufacturer: "",
                                  seat_map: "",
                                }),
                                capacity: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Seat Map
                          </label>
                          <textarea
                            className="w-full min-h-[120px] border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Paste JSON seat map here"
                            value={newAircraft?.seat_map || ""}
                            onChange={(e) =>
                              setNewAircraft((prev) => ({
                                ...(prev || {
                                  model: "",
                                  capacity: 0,
                                  manufacturer: "",
                                  seat_map: "",
                                }),
                                seat_map: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={createAircraftHandler}
                        >
                          Add Aircraft
                        </Button>
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
                                  {aircraft.manufacturer} - {aircraft.model}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {aircraft.capacity} seats
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 border-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
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
