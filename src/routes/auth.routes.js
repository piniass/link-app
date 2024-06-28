import { Router } from "express";
import { login, logout,register, profile, verifyToken } from "../controllers/auth.controller.js";
import { createLink, getLinks, getLink, deleteLink, updateLink } from "../controllers/links.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router()

router.post('/register',register);

router.post('/login',login);

router.post('/logout',logout);

router.get('/profile', authRequired, profile)

router.get('/link', authRequired, getLinks)

router.get('/link/:id', authRequired, getLink)

router.post('/link', authRequired, createLink)

router.put('/link/:id', authRequired, updateLink)

router.delete('/link/:id', authRequired, deleteLink)

router.get("/auth/verify", verifyToken);

export default router;