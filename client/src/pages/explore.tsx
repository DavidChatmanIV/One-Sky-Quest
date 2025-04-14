import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DESTINATIONS } from "@/lib/constants";
import { Destination } from "@/lib/types";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const { data: destinations, isLoading } = useQuery({
    queryKey: ["/api/destinations"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return DESTINATIONS;
    },
  });

  // Filter destinations based on search term and category filter
  const filteredDestinations = destinations?.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || destination.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Helper function to render star rating
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon
            key={`full-${i}`}
            icon="star"
            className="text-yellow-400 text-xs"
          />
        ))}
        {hasHalfStar && (
          <FontAwesomeIcon
            icon="star-half-alt"
            className="text-yellow-400 text-xs"
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon
            key={`empty-${i}`}
            icon={["far", "star"]}
            className="text-yellow-400 text-xs"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-neutral-800 mb-4">
          Explore Destinations
        </h1>
        <p className="text-neutral-500 max-w-3xl">
          Discover amazing places around the world, from bustling cities to
          serene beaches and historic landmarks.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <FontAwesomeIcon
            icon="search"
            className="absolute left-3 top-3 text-neutral-500"
          />
          <Input
            type="text"
            placeholder="Search destinations, countries, or attractions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 h-12 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>
        <Tabs
          defaultValue="all"
          className="w-full md:w-auto"
          onValueChange={setFilter}
        >
          <TabsList className="h-12">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="city">Cities</TabsTrigger>
            <TabsTrigger value="beach">Beaches</TabsTrigger>
            <TabsTrigger value="mountain">Mountains</TabsTrigger>
            <TabsTrigger value="historic">Historic</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <FontAwesomeIcon
            icon="spinner"
            spin
            className="text-primary text-3xl"
          />
        </div>
      ) : filteredDestinations && filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination: Destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover transition hover:scale-105 duration-700"
                />
                {destination.featured && (
                  <div className="absolute top-3 left-3 bg-accent/90 text-white text-xs px-2 py-1 rounded-md font-medium">
                    Featured
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-neutral-800">
                    {destination.name}
                  </h3>
                  <div className="flex items-center">
                    {renderStarRating(destination.rating)}
                    <span className="text-xs text-neutral-500 ml-1">
                      {destination.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mb-3 text-sm text-neutral-500">
                  <FontAwesomeIcon
                    icon="map-marker-alt"
                    className="text-accent mr-1"
                  />
                  <span>{destination.country}</span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    <span className="text-accent">
                      ${destination.pricePerNight}
                    </span>
                    <span className="text-neutral-500"> / night</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-neutral-50 rounded-lg">
          <FontAwesomeIcon
            icon="map"
            className="text-neutral-300 text-5xl mb-4"
          />
          <h3 className="text-xl font-medium text-neutral-700 mb-2">
            No destinations found
          </h3>
          <p className="text-neutral-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Explore;
