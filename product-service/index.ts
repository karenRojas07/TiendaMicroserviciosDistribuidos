import express from "express";
import productRoutes from "./routers/product.router";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("Order-service recibió:", req.method, req.originalUrl);
  next();
});


app.use("/", productRoutes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
});
