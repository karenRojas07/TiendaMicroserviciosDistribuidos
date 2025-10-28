import express from "express";
import userRoutes from "./routers/user.router";

const app = express();
app.use(express.json());

app.use("/", userRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});
