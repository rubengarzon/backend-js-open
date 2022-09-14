"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./src/server"));
const logger_1 = require("./src/utils/logger");
const logger_2 = require("./src/utils/logger");
// * Configuration the .env file
dotenv_1.default.config();
const port = process.env.PORT || 8000;
// * Execute the server
server_1.default.listen(port, () => {
    (0, logger_1.LogSuccess)(`[SERVER ON]: Running in http://localhost:${port}/api`);
});
// * Control SERVER ERROR
server_1.default.on("error", (error) => {
    (0, logger_2.LogError)(`[SERVER ERROR]: ${error}`);
});
//# sourceMappingURL=index.js.map