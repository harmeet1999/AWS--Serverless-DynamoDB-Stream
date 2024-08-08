import * as dotenv from "dotenv";
dotenv.config();
import serverless from "serverless-http";
import express, { Response, Request, Application } from "express";
import cors from "cors";
import db from "../connections/db"
import errorHandeler from "../middleware/error";
import productRoutes from "../routes/product";

const app: Application = express();

db()

app.use(cors());
app.use(express.json());

app.use("/", productRoutes);

app.get("*", (req: Request, res: Response) => {
  res.status(200).send("This website is for API");
});

app.use(errorHandeler);

if (process.env.LAMBDA_TASK_ROOT) {
  exports.handler = serverless(app);
} else {
  if (!process.env.PORT) {
    process.exit(1);
  }

  const PORT: number = parseInt(process.env.PORT as string, 10);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}






// exports.handler = serverless(app);

