import express from "express";
import sequelize from "./sequelize";
import userRoutes from "./routers/user.router";

const app = express();
const PORT = 3003;
// Middleware para procesar solicitudes JSON
app.use(express.json());

// Usa las rutas de usuario
app.use("/", userRoutes);

(async () => {
  try {
    await sequelize.authenticate(); // verifica credenciales/host/puerto
    // OJO: sync({ alter: false }) para no tocar el esquema existente
    await sequelize.sync({ alter: false });
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`User Service running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error de conexión/sincronización a la base de datos:', err);
    process.exit(1);
  }
})();