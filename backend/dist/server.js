"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.MONGO_URI, {
//   useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB..');
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}..`);
    });
}).catch((error) => {
    console.error('Connection error', error);
});