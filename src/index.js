import 'dotenv/config'; // This loads dotenv immediately

// Debug: Check if env vars are loaded
console.log('Environment variables loaded:');
console.log('AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);
console.log('AUTH0_ISSUER_BASE_URL:', process.env.AUTH0_ISSUER_BASE_URL);
console.log('MONGODB_CONNECTION_STRING:', process.env.MONGODB_CONNECTION_STRING);

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes.js";
// import myRestaurantRoute from "./routes/MyRestaurantRoute.js";
// import restaurantRoute from "./routes/RestaurantRoute.js";
// import orderRoute from "./routes/OrderRoute.js";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
// app.use("/api/my/restaurant", myRestaurantRoute);
// app.use("/api/restaurant", restaurantRoute);
// app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log(`server started on localhost:${PORT}`);
});