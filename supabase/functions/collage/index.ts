import { collageHandler } from "../_router/imgRouter.ts";
import { Handler, Server } from "../_shared/deps.ts";
import { corsHeaders } from "../_shared/types.ts";

const PORT = Deno.env.get("PORT") || 8343;
const handler: Handler = async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const url = new URL(req.url);
  console.log(url);
  try {
    const res = await collageHandler(req);
    return res;
  } catch (error) {
    console.log(error);
    return new Response("Not found", {
      status: 404,
      statusText: "No Route Found",
    });
  }
};

console.log(`Listening on: ${PORT}`);

const server = new Server({ port: PORT as number, handler });

await server.listenAndServe();
