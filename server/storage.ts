import {
  User,
  InsertUser,
  Trip,
  InsertTrip,
  ItineraryItem,
  InsertItineraryItem,
  Expense,
  InsertExpense,
  Booking,
  InsertBooking,
  Alert,
  InsertAlert,
  HiddenGem,
  InsertHiddenGem,
  CommunityPost,
  InsertCommunityPost,
  LocalExpert,
  InsertLocalExpert,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Trip operations
  getTrips(): Promise<Trip[]>;
  getTripsByUserId(userId: number): Promise<Trip[]>;
  getTrip(id: number): Promise<Trip | undefined>;
  createTrip(trip: InsertTrip): Promise<Trip>;
  updateTrip(id: number, trip: Partial<Trip>): Promise<Trip | undefined>;
  deleteTrip(id: number): Promise<boolean>;

  // Itinerary operations
  getItineraryItemsByTripId(tripId: number): Promise<ItineraryItem[]>;
  getItineraryItem(id: number): Promise<ItineraryItem | undefined>;
  createItineraryItem(item: InsertItineraryItem): Promise<ItineraryItem>;
  updateItineraryItem(
    id: number,
    item: Partial<ItineraryItem>
  ): Promise<ItineraryItem | undefined>;
  deleteItineraryItem(id: number): Promise<boolean>;

  // Expense operations
  getExpensesByTripId(tripId: number): Promise<Expense[]>;
  getExpense(id: number): Promise<Expense | undefined>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(
    id: number,
    expense: Partial<Expense>
  ): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;

  // Booking operations
  getBookingsByTripId(tripId: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(
    id: number,
    booking: Partial<Booking>
  ): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;

  // Alert operations
  getAlertsByUserId(userId: number): Promise<Alert[]>;
  getAlertsByTripId(tripId: number): Promise<Alert[]>;
  getAlert(id: number): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, alert: Partial<Alert>): Promise<Alert | undefined>;
  deleteAlert(id: number): Promise<boolean>;
  markAlertAsRead(id: number): Promise<Alert | undefined>;

  // HiddenGem operations
  getHiddenGems(): Promise<HiddenGem[]>;
  getHiddenGem(id: number): Promise<HiddenGem | undefined>;
  getHiddenGemsByLocation(location: string): Promise<HiddenGem[]>;
  createHiddenGem(gem: InsertHiddenGem): Promise<HiddenGem>;

  // Community operations
  getCommunityPosts(): Promise<CommunityPost[]>;
  getCommunityPost(id: number): Promise<CommunityPost | undefined>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;

  // LocalExpert operations
  getLocalExperts(): Promise<LocalExpert[]>;
  getLocalExpertsByLocation(location: string): Promise<LocalExpert[]>;
  getLocalExpert(id: number): Promise<LocalExpert | undefined>;
  createLocalExpert(expert: InsertLocalExpert): Promise<LocalExpert>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trips: Map<number, Trip>;
  private itineraryItems: Map<number, ItineraryItem>;
  private expenses: Map<number, Expense>;
  private bookings: Map<number, Booking>;
  private alerts: Map<number, Alert>;
  private hiddenGems: Map<number, HiddenGem>;
  private communityPosts: Map<number, CommunityPost>;
  private localExperts: Map<number, LocalExpert>;

  private userIdCounter: number;
  private tripIdCounter: number;
  private itineraryItemIdCounter: number;
  private expenseIdCounter: number;
  private bookingIdCounter: number;
  private alertIdCounter: number;
  private hiddenGemIdCounter: number;
  private communityPostIdCounter: number;
  private localExpertIdCounter: number;

  constructor() {
    this.users = new Map();
    this.trips = new Map();
    this.itineraryItems = new Map();
    this.expenses = new Map();
    this.bookings = new Map();
    this.alerts = new Map();
    this.hiddenGems = new Map();
    this.communityPosts = new Map();
    this.localExperts = new Map();

    this.userIdCounter = 1;
    this.tripIdCounter = 1;
    this.itineraryItemIdCounter = 1;
    this.expenseIdCounter = 1;
    this.bookingIdCounter = 1;
    this.alertIdCounter = 1;
    this.hiddenGemIdCounter = 1;
    this.communityPostIdCounter = 1;
    this.localExpertIdCounter = 1;

    this.initializeData();
  }

  // Initialize data with some sample entries for development
  private initializeData(): void {
    const now = new Date();

    // Add sample hidden gems
    this.createHiddenGem({
      title: "Le Comptoir du Relais",
      description:
        "This tiny bistro serves some of the city's best authentic French cuisine, but is often overlooked by tourists for more famous establishments.",
      location: "Saint-Germain-des-Prés, Paris",
      imageUrl: "https://images.unsplash.com/photo-1517309230475-6736d926b979",
      rating: 48,
      reviewCount: 124,
      reviewerType: "locals",
      tags: ["food", "bistro", "authentic"],
    });

    this.createHiddenGem({
      title: "Promenade Plantée",
      description:
        "This elevated park built on an old railway line offers a peaceful escape from the city with beautiful gardens and unique views.",
      location: "12th Arrondissement, Paris",
      imageUrl: "https://images.unsplash.com/photo-1558522195-e1201b090344",
      rating: 49,
      reviewCount: 86,
      reviewerType: "locals",
      tags: ["nature", "park", "walking"],
    });

    this.createHiddenGem({
      title: "Shakespeare and Company",
      description:
        "This historic English-language bookstore has been a haven for writers and literary fans since 1951, with a charming atmosphere.",
      location: "Latin Quarter, Paris",
      imageUrl: "https://images.unsplash.com/photo-1544699873-808e9734b375",
      rating: 47,
      reviewCount: 156,
      reviewerType: "locals",
      tags: ["books", "culture", "historic"],
    });

    // Add sample local experts
    this.createUser({
      username: "jeanpierre",
      password: "securepassword1",
      email: "jeanpierre@example.com",
      fullName: "Jean-Pierre Dubois",
      bio: "Parisian food enthusiast and cultural guide",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    }).then((user) => {
      this.createLocalExpert({
        userId: user.id,
        location: "Paris, France",
        specialties: ["Food", "Culture"],
        bio: "Born and raised in Paris, I love sharing the hidden culinary treasures of my city.",
        rating: 50,
        reviewCount: 96,
        isVerified: true,
      });
    });

    this.createUser({
      username: "clairedupont",
      password: "securepassword2",
      email: "claire@example.com",
      fullName: "Claire Dupont",
      bio: "Art historian and museum guide",
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    }).then((user) => {
      this.createLocalExpert({
        userId: user.id,
        location: "Paris, France",
        specialties: ["History", "Art"],
        bio: "Art historian specializing in Parisian museums and galleries.",
        rating: 45,
        reviewCount: 78,
        isVerified: true,
      });
    });

    this.createUser({
      username: "michelr",
      password: "securepassword3",
      email: "michel@example.com",
      fullName: "Michel Renard",
      bio: "Music producer and nightlife enthusiast",
      profileImage:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    }).then((user) => {
      this.createLocalExpert({
        userId: user.id,
        location: "Paris, France",
        specialties: ["Nightlife", "Music"],
        bio: "I know all the best spots for live music and nightlife in Paris.",
        rating: 50,
        reviewCount: 112,
        isVerified: true,
      });
    });

    // Add sample community posts
    this.createUser({
      username: "sophiel",
      password: "securepassword4",
      email: "sophie@example.com",
      fullName: "Sophie Laurent",
      bio: "Paris local, travel enthusiast",
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    }).then((user) => {
      this.createCommunityPost({
        userId: user.id,
        title: "Best time to visit Montmartre with fewer tourists?",
        content:
          "I'm planning my trip to Paris and would love to explore Montmartre without the crowds. Any suggestions on days/times that might be less busy?",
        location: "Montmartre, Paris",
        likeCount: 15,
        replyCount: 23,
      });
    });

    this.createUser({
      username: "markt",
      password: "securepassword5",
      email: "mark@example.com",
      fullName: "Mark Thompson",
      bio: "Travel blogger, 28 countries visited",
      profileImage:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79",
    }).then((user) => {
      this.createCommunityPost({
        userId: user.id,
        title: "Hidden food gems near the Eiffel Tower?",
        content:
          "Looking for authentic, non-touristy restaurants within walking distance of the Eiffel Tower. Any recommendations from locals or experienced travelers?",
        location: "Eiffel Tower, Paris",
        likeCount: 27,
        replyCount: 42,
      });
    });

    // Create a demo user with a trip
    this.createUser({
      username: "demo",
      password: "password",
      email: "demo@example.com",
      fullName: "Demo User",
      bio: "Travel enthusiast exploring the world",
      profileImage:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    }).then((user) => {
      // Create a trip
      this.createTrip({
        userId: user.id,
        destination: "Paris, France",
        title: "Paris Getaway",
        startDate: new Date(now.getFullYear(), 5, 15), // June 15
        endDate: new Date(now.getFullYear(), 5, 22), // June 22
        status: "planned",
        budget: 2500,
        travelers: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        bookings: [
          { type: "flight", confirmed: true },
          { type: "hotel", confirmed: true },
          { type: "resort", confirmed: true },
          { type: "cruise", confirmed: false },
          { type: "car", confirmed: false },
        ],
      }).then((trip) => {
        // Add itinerary items
        this.createItineraryItem({
          tripId: trip.id,
          title: "Meiji Shrine",
          description:
            "Start your day with tranquility at this iconic Shinto shrine surrounded by a forest.",
          itemType: "activity",
          startTime: new Date(now.getFullYear(), 5, 15, 9, 0), // 9:00 AM
          endTime: new Date(now.getFullYear(), 5, 15, 11, 0), // 11:00 AM
          location: "Meiji Shrine, Tokyo",
          cost: 0,
          day: 1,
          isCustom: false,
        });

        this.createItineraryItem({
          tripId: trip.id,
          title: "Harajuku & Lunch",
          description:
            "Explore the vibrant Takeshita Street and enjoy lunch at a local café.",
          itemType: "food",
          startTime: new Date(now.getFullYear(), 5, 15, 12, 0), // 12:00 PM
          endTime: new Date(now.getFullYear(), 5, 15, 14, 0), // 2:00 PM
          location: "Harajuku, Tokyo",
          cost: 2500,
          day: 1,
          isCustom: false,
        });

        // Add expenses
        this.createExpense({
          tripId: trip.id,
          title: "Hotel Booking",
          amount: 680,
          category: "accommodation",
          date: new Date(now.getFullYear(), 5, 10),
          notes: "Hotel reservation for Paris trip",
        });

        this.createExpense({
          tripId: trip.id,
          title: "Restaurants",
          amount: 320,
          category: "food",
          date: new Date(now.getFullYear(), 5, 11),
          notes: "Estimated food costs",
        });

        this.createExpense({
          tripId: trip.id,
          title: "Museum tickets",
          amount: 210,
          category: "activities",
          date: new Date(now.getFullYear(), 5, 12),
          notes: "Louvre, Orsay, and other museum entries",
        });

        // Add alerts
        this.createAlert({
          userId: user.id,
          tripId: trip.id,
          title: "Flight AA267 Delayed",
          message:
            "Your New York to Paris flight is delayed by 2 hours. New departure: 7:30 PM.",
          alertType: "flight",
          urgency: "urgent",
          expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24 hours from now
        });

        this.createAlert({
          userId: user.id,
          tripId: trip.id,
          title: "Weather Alert in Paris",
          message:
            "Heavy rain expected tomorrow afternoon. Consider indoor activities for days 2-3 of your trip.",
          alertType: "weather",
          urgency: "normal",
          expiresAt: new Date(now.getTime() + 48 * 60 * 60 * 1000), // 48 hours from now
        });

        this.createAlert({
          userId: user.id,
          tripId: trip.id,
          title: "Special Offer: Seine River Cruise",
          message:
            "20% off for sunset Seine River cruises this week. Perfect addition to your Paris itinerary!",
          alertType: "deal",
          urgency: "info",
          expiresAt: new Date(now.getTime() + 72 * 60 * 60 * 1000), // 72 hours from now
        });

        this.createAlert({
          userId: user.id,
          tripId: trip.id,
          title: "Metro Line 1 Disruption",
          message:
            "Partial closure on Metro Line 1 affecting your route to the Louvre. Alternative routes suggested.",
          alertType: "transport",
          urgency: "normal",
          expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24 hours from now
        });

        // Add bookings
        this.createBooking({
          tripId: trip.id,
          bookingType: "flight",
          title: "Flight to Paris",
          provider: "American Airlines",
          confirmationCode: "AA12345",
          startDate: new Date(now.getFullYear(), 5, 15), // June 15
          endDate: new Date(now.getFullYear(), 5, 15),
          location: "JFK to CDG",
          cost: 850,
          details: { seat: "24A", terminal: "4", gate: "B12" },
        });

        this.createBooking({
          tripId: trip.id,
          bookingType: "hotel",
          title: "Parisian Hotel",
          provider: "Booking.com",
          confirmationCode: "BK98765",
          startDate: new Date(now.getFullYear(), 5, 15), // June 15
          endDate: new Date(now.getFullYear(), 5, 22), // June 22
          location: "15 Rue de Rivoli, Paris",
          cost: 980,
          details: { roomType: "Double", breakfast: true },
        });

        this.createBooking({
          tripId: trip.id,
          bookingType: "resort",
          title: "Côte d'Azur Luxury Resort",
          provider: "ResortBookings",
          confirmationCode: "RB54321",
          startDate: new Date(now.getFullYear(), 5, 23), // June 23
          endDate: new Date(now.getFullYear(), 5, 30), // June 30
          location: "Saint-Tropez, French Riviera",
          cost: 1650,
          details: {
            roomType: "Beach Villa",
            allInclusive: true,
            amenities: ["spa", "private beach", "water sports"],
          },
        });

        this.createBooking({
          tripId: trip.id,
          bookingType: "cruise",
          title: "Mediterranean Cruise",
          provider: "Royal Caribbean",
          confirmationCode: "RC78901",
          startDate: new Date(now.getFullYear(), 7, 10), // August 10
          endDate: new Date(now.getFullYear(), 7, 17), // August 17
          location: "Mediterranean Sea (Barcelona departure)",
          cost: 2100,
          details: {
            cabinType: "Ocean View Suite",
            package: "Premium",
            ports: ["Barcelona", "Nice", "Rome", "Naples", "Sicily"],
          },
        });
      });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const newUser: User = { ...user, id, createdAt: now };
    this.users.set(id, newUser);
    return newUser;
  }

  // Trip operations
  async getTrips(): Promise<Trip[]> {
    return Array.from(this.trips.values());
  }

  async getTripsByUserId(userId: number): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(
      (trip) => trip.userId === userId
    );
  }

  async getTrip(id: number): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async createTrip(trip: InsertTrip): Promise<Trip> {
    const id = this.tripIdCounter++;
    const now = new Date();
    const newTrip: Trip = { ...trip, id, createdAt: now };
    this.trips.set(id, newTrip);
    return newTrip;
  }

  async updateTrip(id: number, trip: Partial<Trip>): Promise<Trip | undefined> {
    const existingTrip = this.trips.get(id);
    if (!existingTrip) return undefined;

    const updatedTrip = { ...existingTrip, ...trip };
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async deleteTrip(id: number): Promise<boolean> {
    return this.trips.delete(id);
  }

  // Itinerary operations
  async getItineraryItemsByTripId(tripId: number): Promise<ItineraryItem[]> {
    return Array.from(this.itineraryItems.values()).filter(
      (item) => item.tripId === tripId
    );
  }

  async getItineraryItem(id: number): Promise<ItineraryItem | undefined> {
    return this.itineraryItems.get(id);
  }

  async createItineraryItem(item: InsertItineraryItem): Promise<ItineraryItem> {
    const id = this.itineraryItemIdCounter++;
    const newItem: ItineraryItem = { ...item, id };
    this.itineraryItems.set(id, newItem);
    return newItem;
  }

  async updateItineraryItem(
    id: number,
    item: Partial<ItineraryItem>
  ): Promise<ItineraryItem | undefined> {
    const existingItem = this.itineraryItems.get(id);
    if (!existingItem) return undefined;

    const updatedItem = { ...existingItem, ...item };
    this.itineraryItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteItineraryItem(id: number): Promise<boolean> {
    return this.itineraryItems.delete(id);
  }

  // Expense operations
  async getExpensesByTripId(tripId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(
      (expense) => expense.tripId === tripId
    );
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const id = this.expenseIdCounter++;
    const now = new Date();
    const newExpense: Expense = { ...expense, id, createdAt: now };
    this.expenses.set(id, newExpense);
    return newExpense;
  }

  async updateExpense(
    id: number,
    expense: Partial<Expense>
  ): Promise<Expense | undefined> {
    const existingExpense = this.expenses.get(id);
    if (!existingExpense) return undefined;

    const updatedExpense = { ...existingExpense, ...expense };
    this.expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  async deleteExpense(id: number): Promise<boolean> {
    return this.expenses.delete(id);
  }

  // Booking operations
  async getBookingsByTripId(tripId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.tripId === tripId
    );
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const now = new Date();
    const newBooking: Booking = { ...booking, id, createdAt: now };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async updateBooking(
    id: number,
    booking: Partial<Booking>
  ): Promise<Booking | undefined> {
    const existingBooking = this.bookings.get(id);
    if (!existingBooking) return undefined;

    const updatedBooking = { ...existingBooking, ...booking };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async deleteBooking(id: number): Promise<boolean> {
    return this.bookings.delete(id);
  }

  // Alert operations
  async getAlertsByUserId(userId: number): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(
      (alert) => alert.userId === userId
    );
  }

  async getAlertsByTripId(tripId: number): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(
      (alert) => alert.tripId === tripId
    );
  }

  async getAlert(id: number): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = this.alertIdCounter++;
    const now = new Date();
    const newAlert: Alert = { ...alert, id, isRead: false, createdAt: now };
    this.alerts.set(id, newAlert);
    return newAlert;
  }

  async updateAlert(
    id: number,
    alert: Partial<Alert>
  ): Promise<Alert | undefined> {
    const existingAlert = this.alerts.get(id);
    if (!existingAlert) return undefined;

    const updatedAlert = { ...existingAlert, ...alert };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async deleteAlert(id: number): Promise<boolean> {
    return this.alerts.delete(id);
  }

  async markAlertAsRead(id: number): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;

    const updatedAlert = { ...alert, isRead: true };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  // HiddenGem operations
  async getHiddenGems(): Promise<HiddenGem[]> {
    return Array.from(this.hiddenGems.values());
  }

  async getHiddenGem(id: number): Promise<HiddenGem | undefined> {
    return this.hiddenGems.get(id);
  }

  async getHiddenGemsByLocation(location: string): Promise<HiddenGem[]> {
    return Array.from(this.hiddenGems.values()).filter((gem) =>
      gem.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async createHiddenGem(gem: InsertHiddenGem): Promise<HiddenGem> {
    const id = this.hiddenGemIdCounter++;
    const now = new Date();
    const newGem: HiddenGem = { ...gem, id, createdAt: now };
    this.hiddenGems.set(id, newGem);
    return newGem;
  }

  // Community operations
  async getCommunityPosts(): Promise<CommunityPost[]> {
    return Array.from(this.communityPosts.values());
  }

  async getCommunityPost(id: number): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }

  async createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost> {
    const id = this.communityPostIdCounter++;
    const now = new Date();
    const newPost: CommunityPost = {
      ...post,
      id,
      likeCount: 0,
      replyCount: 0,
      createdAt: now,
    };
    this.communityPosts.set(id, newPost);
    return newPost;
  }

  // LocalExpert operations
  async getLocalExperts(): Promise<LocalExpert[]> {
    return Array.from(this.localExperts.values());
  }

  async getLocalExpertsByLocation(location: string): Promise<LocalExpert[]> {
    return Array.from(this.localExperts.values()).filter((expert) =>
      expert.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async getLocalExpert(id: number): Promise<LocalExpert | undefined> {
    return this.localExperts.get(id);
  }

  async createLocalExpert(expert: InsertLocalExpert): Promise<LocalExpert> {
    const id = this.localExpertIdCounter++;
    const now = new Date();
    const newExpert: LocalExpert = {
      ...expert,
      id,
      rating: expert.rating || 0,
      reviewCount: expert.reviewCount || 0,
      isVerified: expert.isVerified || false,
      createdAt: now,
    };
    this.localExperts.set(id, newExpert);
    return newExpert;
  }
}

export const storage = new MemStorage();
