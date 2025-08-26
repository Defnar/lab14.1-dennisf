import "dotenv/config"
import express from "express";
import { connect } from "./db/connection.mjs";

const uri = process.env.MONGO_URI;

const app = express();

await connect(uri);
