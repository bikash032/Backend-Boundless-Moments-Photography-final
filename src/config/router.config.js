const authRoutes = require("../models/auth/auth.routes");
const messageRouter = require("../models/contact/message.routers");
const galleryRoutes = require("../models/gallery/gallery.router");
const userRouter = require("../models/users/user.router");

const routes = require("express").Router();

routes.use("/auth", authRoutes);
routes.use("/admin",userRouter)
routes.use("/admin",galleryRoutes)
routes.use("/admin/message",messageRouter)
// routes.use("/admin", adminRoutes);
// routes.use("/contact", contactRoutes);

module.exports = routes;
