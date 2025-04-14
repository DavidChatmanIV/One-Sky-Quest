import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trip } from "@/lib/types";
import { Link } from "wouter";

const MyTrips = () => {
  const [tripStatus, setTripStatus] = useState("all");

  const { data: trips, isLoading } = useQuery({
    queryKey: ["/api/trips"],
    queryFn: async () => {
      // In a real app, this would fetch from the API with userId parameter
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [
        {
          id: 1,
          title: "Paris Getaway",
          destination: "Paris, France",
          startDate: new Date(2023, 5, 15),
          endDate: new Date(2023, 5, 22),
          status: "planned",
          budget: 2500,
          spent: 1280,
          imageUrl:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          bookings: [
            { type: "flight", confirmed: true },
            { type: "hotel", confirmed: true },
            { type: "activities", confirmed: false },
          ],
        },
        {
          id: 2,
          title: "Tokyo Adventure",
          destination: "Tokyo, Japan",
          startDate: new Date(2023, 7, 10),
          endDate: new Date(2023, 7, 20),
          status: "planned",
          budget: 3800,
          spent: 1200,
          imageUrl:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          bookings: [
            { type: "flight", confirmed: true },
            { type: "hotel", confirmed: false },
            { type: "activities", confirmed: false },
          ],
        },
        {
          id: 3,
          title: "Barcelona Weekend",
          destination: "Barcelona, Spain",
          startDate: new Date(2023, 3, 5),
          endDate: new Date(2023, 3, 8),
          status: "completed",
          budget: 1200,
          spent: 1150,
          imageUrl:
            "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          bookings: [
            { type: "flight", confirmed: true },
            { type: "hotel", confirmed: true },
            { type: "activities", confirmed: true },
          ],
        },
      ] as Trip[];
    },
  });

  // Filter trips based on selected status
  const filteredTrips = trips?.filter(
    (trip) => tripStatus === "all" || trip.status === tripStatus
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate days until trip
  const getDaysUntilTrip = (startDate: Date) => {
    const today = new Date();
    const timeDiff = startDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  // Get booking status color
  const getBookingStatusColor = (confirmed: boolean) => {
    return confirmed ? "text-green-500" : "text-amber-500";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-neutral-800 mb-2">
            My Trips
          </h1>
          <p className="text-neutral-500">
            Manage your upcoming and past travel journeys
          </p>
        </div>
        <Link to="/create-trip">
          <Button className="bg-accent hover:bg-accent/90 text-white shadow-md">
            <FontAwesomeIcon icon="plus" className="mr-2" /> Plan New Trip
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" onValueChange={setTripStatus} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Trips</TabsTrigger>
          <TabsTrigger value="planned">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <FontAwesomeIcon
            icon="spinner"
            spin
            className="text-primary text-3xl"
          />
        </div>
      ) : filteredTrips && filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Card
              key={trip.id}
              className="overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={trip.imageUrl}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon
                      icon="calendar-alt"
                      className="mr-2 text-sm"
                    />
                    <span className="text-sm">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{trip.title}</h3>
                </div>
                <div className="absolute top-3 right-3">
                  {trip.status === "planned" && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {getDaysUntilTrip(trip.startDate)} days to go
                    </span>
                  )}
                  {trip.status === "ongoing" && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Ongoing
                    </span>
                  )}
                  {trip.status === "completed" && (
                    <span className="bg-neutral-500 text-white text-xs px-2 py-1 rounded-full">
                      Completed
                    </span>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-3 text-sm text-neutral-600">
                  <FontAwesomeIcon
                    icon="map-marker-alt"
                    className="text-accent mr-2"
                  />
                  <span>{trip.destination}</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Budget Used</span>
                    <span className="font-medium">
                      ${trip.spent || 0} of ${trip.budget}
                    </span>
                  </div>
                  <Progress
                    value={((trip.spent || 0) / trip.budget) * 100}
                    className="h-2 bg-neutral-200"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {trip.bookings?.map((booking, idx) => (
                    <div
                      key={idx}
                      className="text-center p-2 bg-neutral-100 rounded-lg"
                    >
                      <FontAwesomeIcon
                        icon={
                          booking.type === "flight"
                            ? "plane"
                            : booking.type === "hotel"
                            ? "hotel"
                            : booking.type === "resort"
                            ? "umbrella-beach"
                            : booking.type === "cruise"
                            ? "ship"
                            : booking.type === "car"
                            ? "car"
                            : "ticket-alt"
                        }
                        className={getBookingStatusColor(booking.confirmed)}
                      />
                      <p className="text-xs mt-1 text-neutral-600 capitalize">
                        {booking.type}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary/10"
                  >
                    <FontAwesomeIcon icon="edit" className="mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary/10"
                  >
                    <FontAwesomeIcon icon="info-circle" className="mr-1" />{" "}
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-neutral-50 rounded-lg">
          <FontAwesomeIcon
            icon="suitcase"
            className="text-neutral-300 text-5xl mb-4"
          />
          <h3 className="text-xl font-medium text-neutral-700 mb-2">
            No trips found
          </h3>
          <p className="text-neutral-500 mb-4">
            Start planning your next adventure!
          </p>
          <Link to="/create-trip">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <FontAwesomeIcon icon="plus" className="mr-2" /> Create Trip
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
