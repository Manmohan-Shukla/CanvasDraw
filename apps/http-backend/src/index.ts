import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
//@ts-ignore
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema, //@ts-ignore
} from "@repo/common/types";
//@ts-ignore
import { prismaClient } from "@repo/db/db";
//bcrypt
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;
app.post("/signin", async (req: Request, res: Response) => {
  const parsed = SignInSchema.safeParse(req.body);
  if (!parsed.success) {
    console.log("Validation failed:", parsed.error.format()); // or parsed.error.errors
    return res.status(400).json({ error: parsed.error.errors });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsed.data.email,
      password: parsed.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: " NOT AUTHORIZED SIGNin endpoint",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
  return;
});

app.post("/signup", async (req: Request, res: Response) => {
  const parsed = CreateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    console.log("Validation failed:", parsed.error.format()); // or parsed.error.errors
    return res.status(400).json({ error: parsed.error.errors });
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsed.data?.email,
        password: parsed.data?.password,
        name: parsed.data?.name,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    console.log("error", e);
    res.status(411).json({
      message: "USER ALREADY EXSIST",
    });
  }
});

app.post("/room", middleware, async (req: Request, res: Response) => {
  const parsed = CreateRoomSchema.safeParse(req.body);
  if (!parsed.success) {
    console.log("Validation failed:", parsed.error.format()); // or parsed.error.errors
    return res.status(400).json({ error: parsed.error.errors });
  }
  //@ts-ignore
  const userId = req.userId;
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsed.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "ROOM ALREADY CREATED ",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 1000,
    });
    res.json({
      messages,
    });
  } catch (e) {
    console.log(e);
    res.json({
      messages: [],
    });
  }
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({
    room,
  });
});

app.get("/dashboard", middleware, async (req, res) => {
  const userId = req.userId;

  try {
    const userWithRooms = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        rooms: true,
      },
    });

    if (!userWithRooms) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      rooms: userWithRooms.rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

app.listen(3001);
