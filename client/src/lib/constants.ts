import { Destination } from "./types";

// Sample destinations for Explore page
export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    description:
      "The City of Light beckons with its iconic Eiffel Tower, world-class museums, and charming cafés.",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "city",
    rating: 4.8,
    pricePerNight: 120,
    featured: true,
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    description:
      "A city where tradition meets futuristic innovation, offering incredible food, culture, and shopping.",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "city",
    rating: 4.9,
    pricePerNight: 140,
    featured: true,
  },
  {
    id: "3",
    name: "Barcelona",
    country: "Spain",
    description:
      "Explore Gaudí's architectural masterpieces, vibrant markets, and beautiful Mediterranean beaches.",
    imageUrl:
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "city",
    rating: 4.7,
    pricePerNight: 95,
    featured: false,
  },
  {
    id: "4",
    name: "Santorini",
    country: "Greece",
    description:
      "Whitewashed buildings perched on cliffs overlooking the azure Aegean Sea create a picture-perfect setting.",
    imageUrl:
      "https://images.unsplash.com/photo-1469796466635-455ede028ac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "beach",
    rating: 4.9,
    pricePerNight: 180,
    featured: true,
  },
  {
    id: "5",
    name: "Kyoto",
    country: "Japan",
    description:
      "Home to over 1,600 Buddhist temples, hundreds of Shinto shrines, and traditional Japanese gardens.",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "historic",
    rating: 4.8,
    pricePerNight: 110,
    featured: false,
  },
  {
    id: "6",
    name: "Amalfi Coast",
    country: "Italy",
    description:
      "A stunning coastline with dramatic cliffs, picturesque towns, and crystal-clear Mediterranean waters.",
    imageUrl:
      "https://images.unsplash.com/photo-1533934245042-3d0345436ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "beach",
    rating: 4.8,
    pricePerNight: 150,
    featured: false,
  },
  {
    id: "7",
    name: "Swiss Alps",
    country: "Switzerland",
    description:
      "Breathtaking mountain scenery, world-class skiing, and charming alpine villages.",
    imageUrl:
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "mountain",
    rating: 4.9,
    pricePerNight: 200,
    featured: true,
  },
  {
    id: "8",
    name: "Machu Picchu",
    country: "Peru",
    description:
      "An ancient Incan city set high in the Andes Mountains, offering spectacular views and rich history.",
    imageUrl:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "historic",
    rating: 4.9,
    pricePerNight: 85,
    featured: false,
  },
  {
    id: "9",
    name: "Bali",
    country: "Indonesia",
    description:
      "A tropical paradise with beautiful beaches, lush rice terraces, and a vibrant spiritual culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "beach",
    rating: 4.7,
    pricePerNight: 70,
    featured: true,
  },
  {
    id: "10",
    name: "Rome",
    country: "Italy",
    description:
      "The Eternal City offers ancient ruins, Renaissance art, and world-famous Italian cuisine.",
    imageUrl:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "historic",
    rating: 4.6,
    pricePerNight: 110,
    featured: false,
  },
  {
    id: "11",
    name: "New York City",
    country: "United States",
    description:
      "The Big Apple features iconic skyscrapers, world-class museums, and diverse neighborhoods.",
    imageUrl:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "city",
    rating: 4.6,
    pricePerNight: 200,
    featured: false,
  },
  {
    id: "12",
    name: "Queenstown",
    country: "New Zealand",
    description:
      "Known as the adventure capital of the world, offering stunning scenery and adrenaline-pumping activities.",
    imageUrl:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    type: "mountain",
    rating: 4.8,
    pricePerNight: 120,
    featured: false,
  },
];

// Currency codes and symbols
export const CURRENCY_CODES = {
  USD: { name: "US Dollar", symbol: "$" },
  EUR: { name: "Euro", symbol: "€" },
  GBP: { name: "British Pound", symbol: "£" },
  JPY: { name: "Japanese Yen", symbol: "¥" },
  CAD: { name: "Canadian Dollar", symbol: "CAD$" },
  AUD: { name: "Australian Dollar", symbol: "AUD$" },
  CHF: { name: "Swiss Franc", symbol: "CHF" },
};

// Travel categories
export const TRAVEL_CATEGORIES = [
  { id: "city", name: "Cities", icon: "city" },
  { id: "beach", name: "Beaches", icon: "umbrella-beach" },
  { id: "mountain", name: "Mountains", icon: "mountain" },
  { id: "historic", name: "Historic", icon: "landmark" },
  { id: "food", name: "Culinary", icon: "utensils" },
  { id: "adventure", name: "Adventure", icon: "hiking" },
  { id: "nature", name: "Nature", icon: "leaf" },
];

// Travel seasons
export const TRAVEL_SEASONS = [
  { id: "winter", name: "Winter", months: [12, 1, 2] },
  { id: "spring", name: "Spring", months: [3, 4, 5] },
  { id: "summer", name: "Summer", months: [6, 7, 8] },
  { id: "fall", name: "Fall", months: [9, 10, 11] },
];

// Default traveler options
export const TRAVELER_OPTIONS = [
  "1 Adult",
  "2 Adults",
  "2 Adults, 1 Child",
  "2 Adults, 2 Children",
  "1 Adult, 1 Child",
  "1 Adult, 2 Children",
  "3 Adults",
  "4 Adults",
];

// App features for marketing
export const APP_FEATURES = [
  {
    title: "All-in-One Booking",
    description:
      "Flights, hotels, car rentals, activities, and travel insurance in one place.",
    icon: "bookmark",
  },
  {
    title: "AI-Powered Itinerary Planner",
    description:
      "Personalized travel plans based on budget, interests, and past trips.",
    icon: "map-marked",
  },
  {
    title: "Smart Budget Tracker",
    description:
      "Real-time spending insights, currency conversion, and cost-cutting suggestions.",
    icon: "wallet",
  },
  {
    title: "Real-Time Alerts",
    description:
      "AI-driven notifications for flight delays, weather changes, or last-minute deals.",
    icon: "bell",
  },
  {
    title: "Offline Mode",
    description:
      "Download trip details, maps, and key documents for when there's no internet.",
    icon: "cloud-download-alt",
  },
  {
    title: "Hidden Gem Finder",
    description:
      "AI-powered suggestions for unique experiences beyond tourist traps.",
    icon: "gem",
  },
  {
    title: "Social & Community",
    description:
      "Connect with travelers, share experiences, and get local insights.",
    icon: "users",
  },
];
