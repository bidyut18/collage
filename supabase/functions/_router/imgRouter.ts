import { Status } from "../_shared/deps.ts";
import { corsHeaders, ImageRequest } from "../_shared/types.ts";
import { getTime } from "../_utils/chrono.ts";
import { collageCreation } from "./imgController.ts";

export const collageHandler = async (req: Request): Promise<Response> => {
  try {
    const start = Date.now();
    const value: ImageRequest = await req.json();
    if (!req.bodyUsed) {
      return new Response("No Data Provided", {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const collage = await collageCreation(
      3,
      value.collageGrid == "3x3" ? 3 : 2,
      value.imgPaths,
      value.spacing,
      value.folderName,
    );
    return new Response(collage, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "X-Response-Time": `${Date.now() - start}ms`,
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server is crashed" + getTime(),
      }),
      {
        status: Status.InternalServerError,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
};
