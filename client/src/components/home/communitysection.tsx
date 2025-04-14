import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    description: string;
  };
  title: string;
  content: string;
  postedAt: string;
  replyCount: number;
}

interface Expert {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialty: string;
  rating: number;
  reviewCount: number;
}

interface Meetup {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
}

const CommunitySection = () => {
  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["/api/community/posts"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [
        {
          id: "1",
          author: {
            id: "1",
            name: "Sophie L.",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
            description: "Paris local · Joined 2 years ago",
          },
          title: "Best time to visit Montmartre with fewer tourists?",
          content:
            "I'm planning my trip to Paris and would love to explore Montmartre without the crowds. Any suggestions on days/times that might be less busy?",
          postedAt: "2 days ago",
          replyCount: 23,
        },
        {
          id: "2",
          author: {
            id: "2",
            name: "Mark T.",
            avatar:
              "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
            description: "Frequent Traveler · 28 countries",
          },
          title: "Hidden food gems near the Eiffel Tower?",
          content:
            "Looking for authentic, non-touristy restaurants within walking distance of the Eiffel Tower. Any recommendations from locals or experienced travelers?",
          postedAt: "5 days ago",
          replyCount: 42,
        },
      ] as CommunityPost[];
    },
  });

  const { data: experts, isLoading: isExpertsLoading } = useQuery({
    queryKey: ["/api/local-experts"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 300));
      return [
        {
          id: "1",
          name: "Jean-Pierre",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Paris",
          specialty: "Food & Culture",
          rating: 5.0,
          reviewCount: 96,
        },
        {
          id: "2",
          name: "Claire D.",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Paris",
          specialty: "History & Art",
          rating: 4.5,
          reviewCount: 78,
        },
        {
          id: "3",
          name: "Michel R.",
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Paris",
          specialty: "Nightlife & Music",
          rating: 5.0,
          reviewCount: 112,
        },
      ] as Expert[];
    },
  });

  const { data: meetups, isLoading: isMeetupsLoading } = useQuery({
    queryKey: ["/api/meetups"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 200));
      return [
        {
          id: "1",
          title: "Paris Photography Walk",
          date: "June 15, 2023",
          time: "10:00 AM",
          attendees: 12,
        },
        {
          id: "2",
          title: "Wine Tasting Tour",
          date: "June 18, 2023",
          time: "6:30 PM",
          attendees: 8,
        },
      ] as Meetup[];
    },
  });

  // Helper function to render star rating
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex mt-1">
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
    <section className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-neutral-800 mb-2">
            Join Our Travel Community
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Connect with like-minded travelers, share experiences, and get
            insider tips for your destinations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="font-semibold text-lg text-neutral-800">
                  Community Discussions
                </h3>
              </div>

              <CardContent className="p-4 space-y-6">
                {isPostsLoading ? (
                  <div className="flex justify-center py-8">
                    <FontAwesomeIcon
                      icon="spinner"
                      spin
                      className="text-primary text-2xl"
                    />
                  </div>
                ) : posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="border-b border-neutral-200 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        <Avatar className="w-10 h-10 rounded-full mr-3">
                          <AvatarImage
                            src={post.author.avatar}
                            alt={`${post.author.name} profile`}
                          />
                          <AvatarFallback>
                            {post.author.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-neutral-800">
                                {post.author.name}
                              </h4>
                              <p className="text-neutral-500 text-xs">
                                {post.author.description}
                              </p>
                            </div>
                            <span className="text-xs text-neutral-500">
                              {post.postedAt}
                            </span>
                          </div>
                          <div className="mt-2">
                            <h5 className="font-medium text-neutral-800 mb-1">
                              {post.title}
                            </h5>
                            <p className="text-neutral-600 text-sm">
                              {post.content}
                            </p>
                          </div>
                          <div className="flex items-center mt-3 space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-xs text-neutral-500 hover:text-primary h-auto p-1"
                            >
                              <FontAwesomeIcon
                                icon={["far", "comment"]}
                                className="mr-1"
                              />{" "}
                              {post.replyCount} replies
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-xs text-neutral-500 hover:text-primary h-auto p-1"
                            >
                              <FontAwesomeIcon
                                icon={["far", "heart"]}
                                className="mr-1"
                              />{" "}
                              Like
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-xs text-neutral-500 hover:text-primary h-auto p-1"
                            >
                              <FontAwesomeIcon
                                icon={["far", "bookmark"]}
                                className="mr-1"
                              />{" "}
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    No community discussions available.
                  </div>
                )}
              </CardContent>

              <div className="p-4 bg-neutral-100 border-t border-neutral-200">
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800"
                >
                  View All Discussions
                </Button>
              </div>
            </Card>
          </div>

          <div>
            <Card className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="font-semibold text-lg text-neutral-800">
                  Local Experts
                </h3>
              </div>

              <CardContent className="p-4">
                {isExpertsLoading ? (
                  <div className="flex justify-center py-8">
                    <FontAwesomeIcon
                      icon="spinner"
                      spin
                      className="text-primary text-2xl"
                    />
                  </div>
                ) : experts && experts.length > 0 ? (
                  <div className="space-y-4">
                    {experts.map((expert) => (
                      <div
                        key={expert.id}
                        className="flex items-center p-2 hover:bg-neutral-50 rounded-lg transition cursor-pointer"
                      >
                        <Avatar className="w-12 h-12 rounded-full mr-3">
                          <AvatarImage
                            src={expert.avatar}
                            alt={`${expert.name} profile`}
                          />
                          <AvatarFallback>
                            {expert.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-neutral-800">
                            {expert.name}
                          </h4>
                          <p className="text-xs text-neutral-500">
                            {expert.location} • {expert.specialty}
                          </p>
                          <div className="flex items-center">
                            {renderStarRating(expert.rating)}
                            <span className="text-xs text-neutral-500 ml-1">
                              ({expert.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    No local experts available.
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Connect with a Local
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="font-semibold text-lg text-neutral-800">
                  Upcoming Meetups
                </h3>
              </div>

              <CardContent className="p-4">
                {isMeetupsLoading ? (
                  <div className="flex justify-center py-8">
                    <FontAwesomeIcon
                      icon="spinner"
                      spin
                      className="text-primary text-2xl"
                    />
                  </div>
                ) : meetups && meetups.length > 0 ? (
                  <div className="space-y-4">
                    {meetups.map((meetup) => (
                      <div
                        key={meetup.id}
                        className="border border-neutral-200 rounded-lg p-3 hover:border-primary/50 transition cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-neutral-800">
                              {meetup.title}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {meetup.date} • {meetup.time}
                            </p>
                          </div>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            {meetup.attendees} Going
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    No upcoming meetups available.
                  </div>
                )}

                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    View All Meetups
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
