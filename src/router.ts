import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";
import Product from "./models/Product.model";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("ID no valido"), 
  getProductById
);

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);
router.put(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  updateProduct
);
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  updateAvailability
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  deleteProduct
);


export default router;
