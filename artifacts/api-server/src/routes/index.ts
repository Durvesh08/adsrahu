import { Router, type IRouter } from "express";
import authRouter from "./auth";
import healthRouter from "./health";
import settingsRouter from "./settings";
import leadsRouter from "./leads";
import bookingsRouter from "./bookings";
import blogRouter from "./blog";
import subscribersRouter from "./subscribers";

const router: IRouter = Router();

router.use(authRouter);
router.use(healthRouter);
router.use(settingsRouter);
router.use(leadsRouter);
router.use(bookingsRouter);
router.use(blogRouter);
router.use(subscribersRouter);

export default router;
