import { Router } from "express";
import adminRoutes from "../app/modules/Admin/admin.route";
import AuthRoutes from "../app/modules/Auth/auth.routes";
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
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
