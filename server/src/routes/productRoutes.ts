import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";

const router = Router();

// routes
router.get("/", getProducts);
router.post("/", createProduct);
export default router;
