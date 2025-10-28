import express from "express";
import orderRoutes from "./routers/order.routes";

const app = express();
app.use((req, res, next) => {
  console.log("Order-service recibió:", req.method, req.originalUrl);
  next();
});

app.use(express.json());

app.use("/", orderRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});

