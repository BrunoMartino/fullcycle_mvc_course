import { app } from "./config/express";
import companyRoutes from "./modules/company/routes/companyRoutes";
import "dotenv/config";
import { errorHandler } from "./shared/errors/errorHandler";
import "express-async-errors";

const PORT = Number(process.env.BACKEND_PORT) || 8000;

app.use(companyRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Rota não encontrada",
  });
});

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
