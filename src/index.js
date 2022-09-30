import cors from "cors";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import { createStream } from "rotating-file-stream";
import { loadRoutes } from "./utils/routes-loader";
import { errorHandler } from "./middlewares/errorHandler/errorHanders.middleware";

const app = express();

/** CONFIG SERVER */
app.set("port", 5001);
app.use(cors());

const stream = createStream("./log/express.log", {
  size: "10M",
  interval: "1d",
  compress: "gzip",
});

app.use(morgan("combined", { stream }));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(hpp());
app.use(helmet());
app.disable("x-powered-by");

/** ROUTES */
loadRoutes(app);
app.use("/api/v1/status", require("./routes/application/status.routes"));
app.all("*", function (req, res) {
  return res.status(404).json({
    error: true,
    messsage: "🖐️ These Aren't the 🤖Droids You're Looking For",
    data: { method: req.method, url: req.originalUrl },
  });
});

app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
);
