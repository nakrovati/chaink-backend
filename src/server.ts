import { Elysia } from "elysia";

// Routers
import urlRouter from "./url/urlRouter";

const app = new Elysia().use(urlRouter).listen(3000);

console.log(`🦊 Server is running at on port ${app.server?.port}`);
