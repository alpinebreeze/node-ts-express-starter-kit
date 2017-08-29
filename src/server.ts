import * as compression from "compression";
import * as express from "express";
import * as helmet from "helmet";
import * as parseArgs from "minimist";
import router from "./router";

interface Options {
    port: number;
}

const defaultOptions: Options = {
    port: 8000,
};

export default {

    start: (args: string[] = []) => {

        const options = parseArgs(args);
        const settings = { ...defaultOptions, ...options };
        const app = express();

        app.use(helmet());
        app.use(compression());
        app.use(router());

        app.listen(settings.port, () => {

            const environment = process.env.NODE_ENV || "development";
            console.log(`${environment} server listening on port ${settings.port}`);
        });
    },
};
