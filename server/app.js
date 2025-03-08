import express from "express";
import { PORT } from "./config/env.js";
import authrouter from "./routes/auth.routes.js";
import userrouter from "./routes/user.routes.js";
import productrouter from "./routes/product.routes.js";
import orderrouter from "./routes/order.routes.js";
import cartrouter from "./routes/cart.routes.js";
import connectodatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";


const app = express();

app.use(cors()); // ✅ Enable CORS
app.use(express.json()); // ✅ Parse JSON body
app.use(express.urlencoded({ extended: true })); // ✅ Parse URL-encoded data (form data)
app.use(cookieParser());
app.use(morgan("dev"));
// ✅ Define routes AFTER middleware
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/user", userrouter);
app.use("/api/v1/products", productrouter);
app.use("/api/v1/order", orderrouter);
app.use("/api/v1/cart", cartrouter);

// ✅ Error Handling Middleware (Last)
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// ✅ Connect to database AFTER starting server
connectodatabase();

export default app;
