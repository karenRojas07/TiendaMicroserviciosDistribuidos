import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use((req, res, next) => {
  console.log("Gateway recibió:", req.method, req.originalUrl);
  next();
});


//Redirige a order-service (puerto 3001)
app.use(
  "/orders",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);



//Redirige a product-service (puerto 3002)
app.use(
  "/products",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: { "^/products": "/products" }
  })
);

//Redirige a user-service (puerto 3003)
app.use(
  "/users",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
    pathRewrite: { "^/users": "/users" }
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
