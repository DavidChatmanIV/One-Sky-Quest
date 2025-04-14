import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Alert {
  id: string;
  title: string;
  message: string;
  type: "flight" | "weather" | "deal" | "transport" | "safety";
  urgency: "urgent" | "normal" | "info";
  updatedAt: string;
  icon: string;
}

const alertTypeInfo = {
  flight: {
    color: "red",
    icon: "plane-departure",
  },
  weather: {
    color: "yellow",
    icon: "cloud-rain",
  },
  deal: {
    color: "green",
    icon: "tag",
  },
  transport: {
    color: "blue",
    icon: "subway",
  },
  safety: {
    color: "orange",
    icon: "shield-alt",
  },
};

const RealTimeAlertsSection = () => {
  const [filter, setFilter] = useState<string>("all");

  const { data: alerts, isLoading } = useQuery({
    queryKey: ["/api/alerts"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [
        {
          id: "1",
          title: "Flight AA267 Delayed",
          message:
            "Your New York to Paris flight is delayed by 2 hours. New departure: 7:30 PM.",
          type: "flight" as const,
          urgency: "urgent" as const,
          updatedAt: "15 min ago",
          icon: "plane-departure",
        },
        {
          id: "2",
          title: "Weather Alert in Paris",
          message:
            "Heavy rain expected tomorrow afternoon. Consider indoor activities for days 2-3 of your trip.",
          type: "weather" as const,
          urgency: "normal" as const,
          updatedAt: "2 hours ago",
          icon: "cloud-rain",
        },
        {
          id: "3",
          title: "Special Offer: Seine River Cruise",
          message:
            "20% off for sunset Seine River cruises this week. Perfect addition to your Paris itinerary!",
          type: "deal" as const,
          urgency: "info" as const,
          updatedAt: "Expires in 2 days",
          icon: "tag",
        },
        {
          id: "4",
          title: "Metro Line 1 Disruption",
          message:
            "Partial closure on Metro Line 1 affecting your route to the Louvre. Alternative routes suggested.",
          type: "transport" as const,
          urgency: "normal" as const,
          updatedAt: "4 hours ago",
          icon: "subway",
        },
      ];
    },
  });

  // Filter alerts based on selected filter
  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts?.filter((alert) => alert.type === filter);

  return (
    <section className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-neutral-800 mb-2">
            Real-Time Travel Alerts
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Stay informed with AI-driven notifications about flight changes,
            weather updates, and exclusive deals
          </p>
        </div>

        <Card className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg text-neutral-800">
              Your Travel Alerts
            </h3>
            <div className="flex items-center">
              <span className="text-sm text-neutral-500 mr-3">Filter by:</span>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="border border-neutral-200 rounded-md text-sm p-1 focus:outline-none focus:ring-2 focus:ring-primary h-auto min-w-[140px]">
                  <SelectValue placeholder="All Alerts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="flight">Flights</SelectItem>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="deal">Deals</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CardContent className="p-0 space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <FontAwesomeIcon
                  icon="spinner"
                  spin
                  className="text-primary text-2xl"
                />
              </div>
            ) : filteredAlerts && filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => {
                const typeInfo = alertTypeInfo[alert.type];
                return (
                  <div
                    key={alert.id}
                    className={`border-l-4 border-${typeInfo.color}-500 bg-${typeInfo.color}-50 p-4 rounded-r-lg flex`}
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className={`w-10 h-10 rounded-full bg-${typeInfo.color}-100 flex items-center justify-center text-${typeInfo.color}-500`}
                      >
                        <FontAwesomeIcon icon={typeInfo.icon} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-neutral-800">
                          {alert.title}
                        </h4>
                        <span
                          className={`text-xs bg-${typeInfo.color}-200 text-${typeInfo.color}-800 px-2 py-0.5 rounded-full`}
                        >
                          {alert.type.charAt(0).toUpperCase() +
                            alert.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-neutral-600 text-sm mt-1">
                        {alert.message}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-neutral-500">
                          {alert.updatedAt}
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            variant="link"
                            className="text-xs text-primary hover:text-primary/80 p-0 h-auto"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="link"
                            className="text-xs text-neutral-500 hover:text-neutral-700 p-0 h-auto"
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-neutral-500">
                No alerts found for the selected filter.
              </div>
            )}

            <div className="mt-6 text-center">
              <Button
                variant="link"
                className="text-primary hover:text-primary/80 font-medium flex items-center mx-auto"
              >
                <FontAwesomeIcon icon="bell" className="mr-2" /> Manage Alert
                Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RealTimeAlertsSection;
