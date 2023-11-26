import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import { authToken } from "../middlewares/auth.middlewares.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", authToken, async (req, res) => {
  try {
    const getUsers = await prisma.user.findMany();
    res.json(getUsers);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.get("/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await prisma.user.findMany({
      where: {
        id,
      },
    });
    res.json(getUser);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.get("/:id/orders", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const getOrders = await prisma.order.findMany({
      where: {
        userId: id,
      },
    });
    res.json(getOrders);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.delete("/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json(deleteUser);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        hashedPassword,
        email,
      },
    });
    res.json(updateUser);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        password: hashedPassword,
        email,
      },
    });
    res.json(createUser);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

export default router;
