import { collageHandler } from "../_router/imgRouter.ts";
import { Handler, Server } from "../_shared/deps.ts";

const PORT = Deno.env.get("PORT") || 8343;
const handler: Handler = (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/") {
    collageHandler(req).then((res) => {
      return res;
    });
  }
  return new Response("Not found", {
    status: 404,
    statusText: "No Route Found",
  });
};

console.log("Running on a Flash Dinosour </>(-**-)</> ");

console.log(`Listening on: ${PORT}`);
const server = new Server({ port: PORT as number, handler });

await server.listenAndServe();
