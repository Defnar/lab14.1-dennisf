import "dotenv/config"
import express from "express";
import { connect } from "./db/connection.mjs";
import router from "./routes/userRoutes.mjs";

const port = process.env.PORT || 8000;
const uri = process.env.MONGO_URI;

const app = express();

await connect(uri);

app.use(express.json());

app.use("/api/users", router);

app.listen(port, () => {
    console.log(`surprise! it's a server!  http://localhost:${port}`)
})