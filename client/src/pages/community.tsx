import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommunityPost, LocalExpert } from "@/lib/types";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch community posts
  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["/api/community/posts"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 600));
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
          location: "Montmartre, Paris",
          postedAt: "2 days ago",
          likeCount: 15,
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
          location: "Eiffel Tower, Paris",
          postedAt: "5 days ago",
          likeCount: 27,
          replyCount: 42,
        },
        {
          id: "3",
          author: {
            id: "3",
            name: "Aisha K.",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
            description: "Travel Blogger · 45 countries",
          },
          title: "Is the Paris Pass worth it for a 4-day trip?",
          content:
            "I'll be visiting Paris for 4 days next month and wondering if the Paris Pass is worth the investment. Planning to visit Louvre, Orsay, Eiffel Tower, and a few other major attractions. Has anyone used it recently?",
          location: "Paris, France",
          postedAt: "1 week ago",
          likeCount: 34,
          replyCount: 56,
        },
        {
          id: "4",
          author: {
            id: "4",
            name: "James W.",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
            description: "First time visitor to Japan",
          },
          title: "Navigating Tokyo's train system for beginners?",
          content:
            "I'll be visiting Tokyo for the first time and I'm a bit intimidated by the train system. Any tips or apps that would help me navigate it more easily? Also, is it worth getting a Japan Rail Pass?",
          location: "Tokyo, Japan",
          postedAt: "3 days ago",
          likeCount: 42,
          replyCount: 38,
        },
      ] as CommunityPost[];
    },
  });

  // Fetch local experts
  const { data: experts, isLoading: isExpertsLoading } = useQuery({
    queryKey: ["/api/local-experts"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [
        {
          id: "1",
          userId: 1,
          name: "Jean-Pierre Dubois",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Paris, France",
          specialties: ["Food", "Culture"],
          bio: "Born and raised in Paris, I love sharing the hidden culinary treasures of my city.",
          rating: 5.0,
          reviewCount: 96,
          verified: true,
        },
        {
          id: "2",
          userId: 2,
          name: "Claire Dupont",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Paris, France",
          specialties: ["History", "Art"],
          bio: "Art historian specializing in Parisian museums and galleries.",
          rating: 4.5,
          reviewCount: 78,
          verified: true,
        },
        {
          id: "3",
          userId: 3,
          name: "Michel Renard",
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Paris, France",
          specialties: ["Nightlife", "Music"],
          bio: "I know all the best spots for live music and nightlife in Paris.",
          rating: 5.0,
          reviewCount: 112,
          verified: true,
        },
        {
          id: "4",
          userId: 4,
          name: "Yuki Tanaka",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Tokyo, Japan",
          specialties: ["Food", "Shopping"],
          bio: "Tokyo native and food enthusiast. I can help you find the best ramen, sushi, and shopping districts.",
          rating: 4.9,
          reviewCount: 87,
          verified: true,
        },
        {
          id: "5",
          userId: 5,
          name: "Carlos Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
          location: "Barcelona, Spain",
          specialties: ["Architecture", "Nightlife"],
          bio: "Architect and Barcelona native. Expert in Gaudí architecture and the city's vibrant nightlife.",
          rating: 4.8,
          reviewCount: 104,
          verified: true,
        },
      ] as LocalExpert[];
    },
  });

  // Fetch upcoming meetups
  const { data: meetups, isLoading: isMeetupsLoading } = useQuery({
    queryKey: ["/api/meetups"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 400));
      return [
        {
          id: "1",
          title: "Paris Photography Walk",
          description:
            "Join us for a walking tour of the most photogenic spots in Paris, led by a professional photographer.",
          location: "Trocadéro Gardens, Paris",
          date: "June 15, 2023",
          time: "10:00 AM",
          duration: "3 hours",
          attendees: 12,
          host: {
            name: "Claire D.",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          },
        },
        {
          id: "2",
          title: "Wine Tasting Tour",
          description:
            "Experience a selection of fine French wines with a sommelier in a historic wine cellar.",
          location: "Le Marais, Paris",
          date: "June 18, 2023",
          time: "6:30 PM",
          duration: "2 hours",
          attendees: 8,
          host: {
            name: "Jean-Pierre D.",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          id: "3",
          title: "Tokyo Street Food Tour",
          description:
            "Explore the vibrant street food scene of Tokyo, from yakitori to takoyaki.",
          location: "Shinjuku, Tokyo",
          date: "June 20, 2023",
          time: "7:00 PM",
          duration: "3 hours",
          attendees: 10,
          host: {
            name: "Yuki T.",
            avatar:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
          },
        },
      ];
    },
  });

  // Filter posts or experts based on search term
  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExperts = experts?.filter(
    (expert) =>
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialties.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-neutral-800 mb-2">
            Travel Community
          </h1>
          <p className="text-neutral-500">
            Connect with travelers, share experiences, and get personalized
            advice
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-white shadow-md">
          <FontAwesomeIcon icon="pen" className="mr-2" /> Create Post
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative mb-6">
          <FontAwesomeIcon
            icon="search"
            className="absolute left-3 top-3.5 text-neutral-500"
          />
          <Input
            type="text"
            placeholder="Search discussions, locations, or experts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 h-12 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <Tabs defaultValue="discussions" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="experts">Local Experts</TabsTrigger>
            <TabsTrigger value="meetups">Meetups</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="mt-6">
            {isPostsLoading ? (
              <div className="flex justify-center py-12">
                <FontAwesomeIcon
                  icon="spinner"
                  spin
                  className="text-primary text-3xl"
                />
              </div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-md transition"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={post.author.avatar}
                            alt={post.author.name}
                          />
                          <AvatarFallback>
                            {post.author.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-neutral-800">
                                {post.author.name}
                              </h3>
                              <p className="text-neutral-500 text-xs">
                                {post.author.description}
                              </p>
                            </div>
                            <span className="text-xs text-neutral-500">
                              {post.postedAt}
                            </span>
                          </div>
                          <div className="mt-3">
                            <h4 className="text-lg font-semibold text-neutral-800 mb-2">
                              {post.title}
                            </h4>
                            <p className="text-neutral-600 mb-3">
                              {post.content}
                            </p>
                            {post.location && (
                              <div className="flex items-center mb-3 text-sm text-neutral-500">
                                <FontAwesomeIcon
                                  icon="map-marker-alt"
                                  className="text-accent mr-1"
                                />
                                <span>{post.location}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center mt-4 space-x-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-neutral-500 hover:text-primary h-auto p-1"
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
                              className="flex items-center text-neutral-500 hover:text-primary h-auto p-1"
                            >
                              <FontAwesomeIcon
                                icon={["far", "heart"]}
                                className="mr-1"
                              />{" "}
                              {post.likeCount} likes
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-neutral-500 hover:text-primary h-auto p-1"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <FontAwesomeIcon
                  icon="comments"
                  className="text-neutral-300 text-5xl mb-4"
                />
                <h3 className="text-xl font-medium text-neutral-700 mb-2">
                  No discussions found
                </h3>
                <p className="text-neutral-500 mb-4">
                  Try adjusting your search or start a new discussion
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <FontAwesomeIcon icon="pen" className="mr-2" /> Start
                  Discussion
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="experts" className="mt-6">
            {isExpertsLoading ? (
              <div className="flex justify-center py-12">
                <FontAwesomeIcon
                  icon="spinner"
                  spin
                  className="text-primary text-3xl"
                />
              </div>
            ) : filteredExperts && filteredExperts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperts.map((expert) => (
                  <Card
                    key={expert.id}
                    className="overflow-hidden hover:shadow-md transition"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-16 w-16 mr-4">
                          <AvatarImage src={expert.avatar} alt={expert.name} />
                          <AvatarFallback>
                            {expert.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-neutral-800">
                              {expert.name}
                            </h3>
                            {expert.verified && (
                              <FontAwesomeIcon
                                icon="check-circle"
                                className="text-primary text-sm"
                                title="Verified Expert"
                              />
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            {renderStarRating(expert.rating)}
                            <span className="text-xs text-neutral-500 ml-1">
                              ({expert.reviewCount})
                            </span>
                          </div>
                          <p className="text-neutral-500 text-sm">
                            {expert.location}
                          </p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {expert.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <p className="text-neutral-600 text-sm">{expert.bio}</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-2 border-primary text-primary hover:bg-primary/10"
                      >
                        <FontAwesomeIcon icon="comment" className="mr-2" />{" "}
                        Message
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <FontAwesomeIcon
                  icon="user-friends"
                  className="text-neutral-300 text-5xl mb-4"
                />
                <h3 className="text-xl font-medium text-neutral-700 mb-2">
                  No experts found
                </h3>
                <p className="text-neutral-500">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="meetups" className="mt-6">
            {isMeetupsLoading ? (
              <div className="flex justify-center py-12">
                <FontAwesomeIcon
                  icon="spinner"
                  spin
                  className="text-primary text-3xl"
                />
              </div>
            ) : meetups && meetups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meetups.map((meetup) => (
                  <Card
                    key={meetup.id}
                    className="overflow-hidden hover:shadow-md transition"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-semibold">
                        {meetup.title}
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <FontAwesomeIcon
                          icon="map-marker-alt"
                          className="text-accent mr-1"
                        />
                        {meetup.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-neutral-600 mb-4">
                        {meetup.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon="calendar-alt"
                            className="text-primary w-5 mr-2"
                          />
                          <span>{meetup.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon="clock"
                            className="text-primary w-5 mr-2"
                          />
                          <span>
                            {meetup.time} • {meetup.duration}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon="users"
                            className="text-primary w-5 mr-2"
                          />
                          <span>{meetup.attendees} people going</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon="user"
                            className="text-primary w-5 mr-2"
                          />
                          <span>Hosted by {meetup.host.name}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        <FontAwesomeIcon
                          icon="calendar-plus"
                          className="mr-2"
                        />{" "}
                        Join Meetup
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <FontAwesomeIcon
                  icon="calendar"
                  className="text-neutral-300 text-5xl mb-4"
                />
                <h3 className="text-xl font-medium text-neutral-700 mb-2">
                  No meetups found
                </h3>
                <p className="text-neutral-500 mb-4">
                  No upcoming meetups in your area
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <FontAwesomeIcon icon="plus" className="mr-2" /> Create Meetup
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
