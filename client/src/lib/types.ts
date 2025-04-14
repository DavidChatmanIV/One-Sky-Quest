// User types
export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  profileImage?: string;
  createdAt: Date;
}

// Trip types
export type TripStatus = "planned" | "ongoing" | "completed" | "cancelled";

export interface Trip {
  id: number;
  userId: number;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  status: TripStatus;
  budget: number;
  spent?: number;
  travelers?: number;
  imageUrl?: string;
  bookings?: {
    type: string;
    confirmed: boolean;
  }[];
  createdAt?: Date;
}

// Itinerary types
export type ItineraryItemType =
  | "activity"
  | "transport"
  | "accommodation"
  | "food";

export interface ItineraryItem {
  id: number;
  tripId: number;
  title: string;
  description?: string;
  itemType: ItineraryItemType;
  startTime: Date;
  endTime?: Date;
  location?: string;
  cost?: number;
  day: number;
  isCustom: boolean;
}

// Expense types
export type ExpenseCategory =
  | "accommodation"
  | "transport"
  | "food"
  | "activities"
  | "shopping"
  | "other";

export interface Expense {
  id: number;
  tripId: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  notes?: string;
  createdAt: Date;
}

// Booking types
export interface Booking {
  id: number;
  tripId: number;
  bookingType: string; // flight, hotel, car, activity
  title: string;
  provider?: string;
  confirmationCode?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  cost: number;
  details?: any;
  createdAt: Date;
}

// Alert types
export type AlertType = "flight" | "weather" | "deal" | "transport" | "safety";

export interface Alert {
  id: number;
  userId: number;
  tripId?: number;
  title: string;
  message: string;
  alertType: AlertType;
  urgency: "urgent" | "normal" | "info";
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

// HiddenGem types
export interface HiddenGem {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  reviewerType?: string;
  tags?: string[];
  createdAt: Date;
}

// Community types
export interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    description: string;
  };
  title: string;
  content: string;
  location?: string;
  postedAt: string;
  likeCount: number;
  replyCount: number;
}

// LocalExpert types
export interface LocalExpert {
  id: string;
  userId: number;
  name: string;
  avatar: string;
  location: string;
  specialties: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

// Destination types
export type DestinationType =
  | "city"
  | "beach"
  | "mountain"
  | "historic"
  | "nature";

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  type: DestinationType;
  rating: number;
  pricePerNight: number;
  featured: boolean;
}
