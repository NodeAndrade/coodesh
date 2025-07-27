import { Router } from "express";
import { IndexController } from "../controllers";

const router = Router();
const indexController = new IndexController();

export function setRoutes(app: Router) {
  app.post("/", indexController.getIndex.bind(indexController));
}

export default router;
