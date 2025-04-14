import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
  boolean,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";
import { array } from "drizzle-orm/pg-core/columns/array"; 
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  bio: text("bio"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Trip statuses
export const tripStatusEnum = pgEnum("trip_status", [
  "planned",
  "ongoing",
  "completed",
  "cancelled",
]);

// Trip model
export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  destination: text("destination").notNull(),
  title: text("title").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: tripStatusEnum("status").default("planned").notNull(),
  budget: integer("budget").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  travelers: integer("travelers").default(1).notNull(),
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
  createdAt: true,
});

// Itinerary item types
export const itineraryItemTypeEnum = pgEnum("itinerary_item_type", [
  "activity",
  "transport",
  "accommodation",
  "food",
]);

// Itinerary model
export const itineraryItems = pgTable("itinerary_items", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  itemType: itineraryItemTypeEnum("item_type").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  location: text("location"),
  cost: integer("cost"),
  day: integer("day").notNull(),
  isCustom: boolean("is_custom").default(false).notNull(),
});

export const insertItineraryItemSchema = createInsertSchema(
  itineraryItems
).omit({
  id: true,
});

// Expense categories
export const expenseCategoryEnum = pgEnum("expense_category", [
  "accommodation",
  "transport",
  "food",
  "activities",
  "shopping",
  "other",
]);

// Expense model
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  title: text("title").notNull(),
  amount: integer("amount").notNull(),
  category: expenseCategoryEnum("category").notNull(),
  date: timestamp("date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  createdAt: true,
});

// Booking model
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  bookingType: text("booking_type").notNull(),
  title: text("title").notNull(),
  provider: text("provider"),
  confirmationCode: text("confirmation_code"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: text("location"),
  cost: integer("cost").notNull(),
  details: json("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

// Alert model
export const alertTypes = pgEnum("alert_type", [
  "flight",
  "weather",
  "deal",
  "transport",
  "safety",
]);

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tripId: integer("trip_id"),
  title: text("title").notNull(),
  message: text("message").notNull(),
  alertType: alertTypes("alert_type").notNull(),
  urgency: text("urgency").default("normal").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

// HiddenGem model ✅ fixed tags array
export const hiddenGems = pgTable("hidden_gems", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  rating: integer("rating"),
  reviewCount: integer("review_count"),
  reviewerType: text("reviewer_type"),
  tags: array(text("tags")), // ✅ Correct usage
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHiddenGemSchema = createInsertSchema(hiddenGems).omit({
  id: true,
  createdAt: true,
});

// Community post model
export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  location: text("location"),
  likeCount: integer("like_count").default(0).notNull(),
  replyCount: integer("reply_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCommunityPostSchema = createInsertSchema(
  communityPosts
).omit({
  id: true,
  likeCount: true,
  replyCount: true,
  createdAt: true,
});

// Local expert model ✅ fixed specialties array
export const localExperts = pgTable("local_experts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  location: text("location").notNull(),
  specialties: array(text("specialties")), // ✅ Correct usage
  bio: text("bio").notNull(),
  rating: integer("rating").default(0).notNull(),
  reviewCount: integer("review_count").default(0).notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLocalExpertSchema = createInsertSchema(localExperts).omit({
  id: true,
  rating: true,
  reviewCount: true,
  isVerified: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Trip = typeof trips.$inferSelect;
export type InsertTrip = z.infer<typeof insertTripSchema>;

export type ItineraryItem = typeof itineraryItems.$inferSelect;
export type InsertItineraryItem = z.infer<typeof insertItineraryItemSchema>;

export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type HiddenGem = typeof hiddenGems.$inferSelect;
export type InsertHiddenGem = z.infer<typeof insertHiddenGemSchema>;

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;

export type LocalExpert = typeof localExperts.$inferSelect;
export type InsertLocalExpert = z.infer<typeof insertLocalExpertSchema>;
