import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "./classes/httpError";
import { CountDogs } from "./utils/countDogs";

const app = express();

app.use(express.json());

app.get("/", (_: Request, res: Response) => {
    res.send("Hello World-");
});

app.get("/dogs", async (_: Request, res: Response, next: NextFunction) => {
    try {
        const dogs = new CountDogs(4);

        if (dogs.countDogs === 0) {
            throw new HttpError(404, "No dogs found");
        }

        res.json(dogs.countDogs);
    } catch (error) {
        next(error);
    }
});

app.use((err: HttpError, _: Request, res: Response, _1: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong",
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
