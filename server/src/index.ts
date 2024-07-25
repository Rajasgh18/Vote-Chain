import express, { Response } from 'express';
import cors from "cors";
import { connectDB, sequelize } from '@/db';

import PartyRoute from '@/routes/party';
import CandidateRoute from '@/routes/candidate';
import VoterRoute from '@/routes/voter';

const allowedOrigins = ["http://localhost:5173"];

const App = express();

connectDB();

App.use(express.json());

// Configure CORS middleware
App.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not Allowed by CORS"));
        }
    },
    credentials: true
}));

App.use("/api/party", PartyRoute);
App.use("/api/candidate", CandidateRoute);
App.use("/api/voter", VoterRoute);

App.get("/", (_, res: Response) => {
    res.status(200).send("Server Running correctly");
});

sequelize.sync({ force: false }).then(() => {
    App.listen(5000, () => {
        console.log("Server running at http://localhost:5000");
    });
});