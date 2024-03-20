import { Router } from "express";
import adminRoutes from "../app/modules/Admin/admin.route";
import userRoutes from "../app/modules/Users/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
