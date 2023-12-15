import { PrismaClient } from "@prisma/client";
import express from "express";
import { authToken } from "../middlewares/auth.middlewares.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getProducts = await prisma.product.findMany({
      where: {
        orderId: null,
      },
    });
    res.json(getProducts);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getProduct = await prisma.product.findMany({
      where: {
        id,
      },
    });
    res.json(getProduct);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json(deleteProduct);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, category, quantity, sectorName } = req.body;
    const updateProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        category,
        quantity,
        sectorName,
      },
    });
    res.json(updateProduct);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const { id } = req.body;
    const addProduct = await prisma.product.create({
      data: {
        id,
      },
    });
    res.json(addProduct);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

router.post("/order", async (req, res) => {
  try {
    const { id, name, category, sectorName, quantity, orderId } = req.body;
    const addProduct = await prisma.product.create({
      data: {
        id,
        name,
        category,
        sectorName,
        quantity,
        orderId,
      },
    });
    res.json(addProduct);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
});

export default router;
