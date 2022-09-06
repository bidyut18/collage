export interface CollageOptions {
  width: number;
  height: number;
  spacing: number;
  imageWidth: number;
  imageHeight: number;
}

export interface FindOptions {
  folder?: string;
  folderPath?: string;
  imgNames?: string[];
  imgName?: string;
}

export type WithRequiredFindOptions<T, K extends keyof T> =
  & T
  & {
    [Property in K]-?: T[Property];
  };

export interface ImageRequest {
  imgPaths: string[];
  spacing: number;
  collageGrid: "3x2" | "3x3";
  folderName: string;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "https://photo-collage.vercel.app/",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  engine: Deno.env.get("ENGINE") || "f(x)^edge",
};
