import { Express, Request, Response } from "express";
import { createServer } from "http";
import { IStorage } from "./storage";
import {
  validateBody,
  insertUserSchema,
  insertTripSchema,
  insertAlertSchema,
  insertHiddenGemSchema,
  insertCommunityPostSchema,
  insertLocalExpertSchema,
} from "./validation";

export function registerRoutes(app: Express, storage: IStorage) {
  // ===== User Routes =====
  app.post("/api/users", async (req: Request, res: Response) => {
    const { data, error } = validateBody(insertUserSchema, req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const user = await storage.createUser(data);
      res.status(201).json(user);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId))
      return res.status(400).json({ message: "Invalid user ID" });

    try {
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ===== Trip Routes =====
  app.post("/api/trips", async (req: Request, res: Response) => {
    const { data, error } = validateBody(insertTripSchema, req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const trip = await storage.createTrip(data);
      res.status(201).json(trip);
    } catch (err) {
      console.error("Error creating trip:", err);
      res.status(500).json({ message: "Failed to create trip" });
    }
  });

  app.get("/api/users/:userId/trips", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId))
      return res.status(400).json({ message: "Invalid user ID" });

    try {
      const trips = await storage.getTripsByUserId(userId);
      res.json(trips);
    } catch (err) {
      console.error("Error fetching trips:", err);
      res.status(500).json({ message: "Failed to fetch trips" });
    }
  });

  // ===== Alert Routes =====
  app.post("/api/alerts", async (req: Request, res: Response) => {
    const { data, error } = validateBody(insertAlertSchema, req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const alert = await storage.createAlert(data);
      res.status(201).json(alert);
    } catch (err) {
      console.error("Error creating alert:", err);
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  app.get("/api/trips/:tripId/alerts", async (req: Request, res: Response) => {
    const tripId = parseInt(req.params.tripId);
    if (isNaN(tripId))
      return res.status(400).json({ message: "Invalid trip ID" });

    try {
      const alerts = await storage.getAlertsByTripId(tripId);
      res.json(alerts);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  // ===== Hidden Gem Routes =====
  app.post("/api/hidden-gems", async (req: Request, res: Response) => {
    const { data, error } = validateBody(insertHiddenGemSchema, req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const gem = await storage.createHiddenGem(data);
      res.status(201).json(gem);
    } catch (err) {
      console.error("Error creating hidden gem:", err);
      res.status(500).json({ message: "Failed to create hidden gem" });
    }
  });

  app.get(
    "/api/trips/:tripId/hidden-gems",
    async (req: Request, res: Response) => {
      const tripId = parseInt(req.params.tripId);
      if (isNaN(tripId))
        return res.status(400).json({ message: "Invalid trip ID" });

      try {
        const gems = await storage.getHiddenGemsByTripId(tripId);
        res.json(gems);
      } catch (err) {
        console.error("Error fetching hidden gems:", err);
        res.status(500).json({ message: "Failed to fetch hidden gems" });
      }
    }
  );

  // ===== Community Post Routes =====
  app.post("/api/community-posts", async (req: Request, res: Response) => {
    const { data, error } = validateBody(insertCommunityPostSchema, req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const post = await storage.createCommunityPost(data);
      res.status(201).json(post);
    } catch (err) {
      console.error("Error creating community post:", err);
      res.status(500).json({ message: "Failed to create community post" });
    }
  });

  app.get("/api/community-posts", async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getCommunityPosts();
      res.json(posts);
    } catch (err) {
      console.error("Error fetching community posts:", err);
      res.status(500).json({ message: "Failed to fetch community posts" });
    }
  });

  // ===== Local Expert Routes =====
  app.post("/api/local-experts", async (req: Request, res: Response) => {
    const { data, error } = validateBody(insertLocalExpertSchema, req.body);
    if (error) return res.status(400).json({ message: error });

    try {
      const expert = await storage.createLocalExpert(data);
      res.status(201).json(expert);
    } catch (err) {
      console.error("Error creating local expert:", err);
      res.status(500).json({ message: "Failed to create local expert" });
    }
  });

  app.get("/api/local-experts", async (_req: Request, res: Response) => {
    try {
      const experts = await storage.getLocalExperts();
      res.json(experts);
    } catch (err) {
      console.error("Error fetching local experts:", err);
      res.status(500).json({ message: "Failed to fetch local experts" });
    }
  });

  const server = createServer(app);
  return server;
}
