import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./utils/errorHandler";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
