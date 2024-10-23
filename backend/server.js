import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Ensure this is set correctly in .env
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handler middleware
app.use(errorHandler);

// Dynamic route loading
const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file) => {
  // Use dynamic import for route files
  import(`./src/routes/${file}`)
    .then((route) => {
      console.log(`Loading route file: ${file}`); // Log which route is being loaded
      app.use("/api/v1", route.default);
    })
    .catch((err) => {
      console.error(`Failed to load route file ${file}`, err); // Log errors if any
    });
});

// Start server and connect to the database
const server = async () => {
  try {
    await connect(); // Connect to the database

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`); // Log server start
    });
  } catch (error) {
    console.error("Failed to start server:", error.message); // Improved error logging
    process.exit(1);
  }
};

server();
