import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HiddenGem {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  reviewerType: string;
}

const HiddenGemSection = () => {
  const { data: hiddenGems, isLoading } = useQuery({
    queryKey: ["/api/hidden-gems"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 400));
      return [
        {
          id: "1",
          title: "Le Comptoir du Relais",
          description:
            "This tiny bistro serves some of the city's best authentic French cuisine, but is often overlooked by tourists for more famous establishments.",
          location: "Saint-Germain-des-Prés, Paris",
          imageUrl:
            "https://images.unsplash.com/photo-1517309230475-6736d926b979?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
          rating: 4.8,
          reviewCount: 124,
          reviewerType: "locals",
        },
        {
          id: "2",
          title: "Promenade Plantée",
          description:
            "This elevated park built on an old railway line offers a peaceful escape from the city with beautiful gardens and unique views.",
          location: "12th Arrondissement, Paris",
          imageUrl:
            "https://images.unsplash.com/photo-1558522195-e1201b090344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
          rating: 4.9,
          reviewCount: 86,
          reviewerType: "locals",
        },
        {
          id: "3",
          title: "Shakespeare and Company",
          description:
            "This historic English-language bookstore has been a haven for writers and literary fans since 1951, with a charming atmosphere.",
          location: "Latin Quarter, Paris",
          imageUrl:
            "https://images.unsplash.com/photo-1544699873-808e9734b375?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
          rating: 4.7,
          reviewCount: 156,
          reviewerType: "locals",
        },
      ] as HiddenGem[];
    },
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
    <section className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold font-poppins text-neutral-800 mb-2">
          Discover Hidden Gems
        </h2>
        <p className="text-neutral-500">
          Go beyond tourist traps with AI-powered suggestions for unique
          experiences
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <FontAwesomeIcon
            icon="spinner"
            spin
            className="text-primary text-2xl"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hiddenGems?.map((gem) => (
            <Card
              key={gem.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={gem.imageUrl}
                  alt={gem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-accent/90 text-white text-xs px-2 py-1 rounded-md font-medium">
                  <FontAwesomeIcon icon="gem" className="mr-1" /> Hidden Gem
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-800 mb-1">
                  {gem.title}
                </h3>
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon
                    icon="map-marker-alt"
                    className="text-accent text-sm"
                  />
                  <span className="text-neutral-500 text-sm ml-1">
                    {gem.location}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm mb-3">
                  {gem.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {renderStarRating(gem.rating)}
                    <span className="text-xs text-neutral-500 ml-1">
                      {gem.rating} ({gem.reviewCount} {gem.reviewerType})
                    </span>
                  </div>
                  <Button
                    variant="link"
                    className="text-primary hover:text-accent transition text-sm font-medium p-0 h-auto"
                  >
                    Save for later
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Button className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition shadow-md">
          <FontAwesomeIcon icon="compass" className="mr-2" />
          Find More Hidden Gems
        </Button>
      </div>
    </section>
  );
};

export default HiddenGemSection;
