"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configuration the .env file
dotenv_1.default.config();
// Create the express APP
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Define the first route of APP
app.get("/", (req, res) => {
    //Send Hello World
    res.send("Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose");
});
app.get("/hello", (req, res) => {
    res.send("Welcome to GET Route: Hello!");
});
// Execute APP and listen the port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map