import { RequestHandler, Router } from "express";

export const getRootRequestHandler: RequestHandler = (req, res) => {

    const name = req.query.name || "World";
    res.json({ message: `Hello, ${name}!` });
};

export default () => {

    const router = Router();
    router.get("/", getRootRequestHandler);
    return router;
};
