import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    title: string;
    description: string;
  }[];
}

const mockedItinerary: ItineraryDay[] = [
  {
    day: 1,
    title: "Historic Tokyo",
    activities: [
      {
        time: "9am",
        title: "Meiji Shrine",
        description:
          "Start your day with tranquility at this iconic Shinto shrine surrounded by a forest.",
      },
      {
        time: "12pm",
        title: "Harajuku & Lunch",
        description:
          "Explore the vibrant Takeshita Street and enjoy lunch at a local café.",
      },
      {
        time: "3pm",
        title: "Shibuya Crossing",
        description:
          "Experience the famous scramble crossing and explore the surrounding area.",
      },
      {
        time: "7pm",
        title: "Izakaya Dinner",
        description:
          "Authentic Japanese dining experience at a local izakaya in Shinjuku.",
      },
    ],
  },
  {
    day: 2,
    title: "Cultural Immersion",
    activities: [
      {
        time: "10am",
        title: "Senso-ji Temple",
        description:
          "Visit Tokyo's oldest temple and explore Asakusa district.",
      },
      {
        time: "1pm",
        title: "Tokyo National Museum",
        description:
          "Discover Japanese art and cultural artifacts at this impressive museum.",
      },
    ],
  },
];

const AIItinerarySection = () => {
  const { data: itinerary, isLoading } = useQuery({
    queryKey: ["/api/mock-itinerary"],
    queryFn: async () => {
      // In a real app, this would be a fetch to an API endpoint
      // For now, we'll just return the mocked data after a short delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockedItinerary;
    },
  });

  return (
    <section className="bg-gradient-to-br from-primary to-secondary py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
              AI-Powered Itinerary Planner
            </h2>
            <p className="mb-6">
              Our advanced AI creates personalized travel plans based on your
              preferences, budget, and travel history. Get curated experiences
              that match your unique style.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mt-1">
                  <FontAwesomeIcon icon="brain" className="text-sm" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Smart Recommendations</h3>
                  <p className="text-white/80 text-sm">
                    Learns your preferences to suggest activities you'll love
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mt-1">
                  <FontAwesomeIcon icon="sliders-h" className="text-sm" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Fully Customizable</h3>
                  <p className="text-white/80 text-sm">
                    Adjust any suggestion to create your perfect itinerary
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mt-1">
                  <FontAwesomeIcon icon="clock" className="text-sm" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Time-Optimized</h3>
                  <p className="text-white/80 text-sm">
                    Efficiently organize each day for maximum enjoyment
                  </p>
                </div>
              </div>
            </div>

            <Button className="bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-lg font-medium transition shadow-md">
              <FontAwesomeIcon icon="wand-magic-sparkles" className="mr-2" />
              Create Your Plan
            </Button>
          </div>

          <div className="lg:w-1/2 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-neutral-100 p-4 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-neutral-800">
                  Your Tokyo Adventure
                </h3>
                <div className="flex space-x-2">
                  <button className="text-neutral-500 hover:text-primary p-1">
                    <FontAwesomeIcon icon={["far", "edit"]} />
                  </button>
                  <button className="text-neutral-500 hover:text-primary p-1">
                    <FontAwesomeIcon icon={["far", "share-square"]} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <FontAwesomeIcon
                    icon="spinner"
                    spin
                    className="text-primary text-2xl"
                  />
                </div>
              ) : (
                itinerary?.map((day) => (
                  <div className="mb-6" key={day.day}>
                    <div className="flex items-center mb-2">
                      <span className="bg-primary text-white text-xs font-bold py-1 px-2 rounded-full">
                        DAY {day.day}
                      </span>
                      <h4 className="font-medium text-neutral-800 ml-2">
                        {day.title}
                      </h4>
                    </div>

                    <div className="space-y-3 pl-4 border-l-2 border-primary/30">
                      {day.activities.map((activity, index) => (
                        <div
                          className="bg-neutral-100 rounded-lg p-3"
                          key={index}
                        >
                          <div className="flex items-start">
                            <span className="text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                              {activity.time}
                            </span>
                            <div className="ml-3">
                              <h5 className="font-medium text-neutral-800">
                                {activity.title}
                              </h5>
                              <p className="text-sm text-neutral-500">
                                {activity.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-neutral-100 p-4 border-t border-neutral-200 flex justify-between items-center">
              <div className="text-sm text-neutral-500">
                <FontAwesomeIcon
                  icon={["far", "calendar-alt"]}
                  className="mr-1"
                />{" "}
                May 15-20, 2023
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  className="text-white bg-primary hover:bg-primary/90 px-3 py-1 rounded text-sm h-auto"
                >
                  <FontAwesomeIcon icon="download" className="mr-1" /> Save
                </Button>
                <Button
                  variant="outline"
                  className="text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded text-sm h-auto"
                >
                  Refine
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIItinerarySection;
