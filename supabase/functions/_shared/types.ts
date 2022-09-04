export interface CollageOptions {
  width: number;
  height: number;
  spacing: number;
  backgroudColor: string;
  imageWidth: number;
  imageHeight: number;
}

export interface FindOptions {
  folder?: string;
  folderPath?: string;
  imgNames?: string[];
  imgName?: string;
}

export type WithRequiredFindOptions<T, K extends keyof T> = T & {
  [Property in K]-?: T[Property];
};

export interface ImageRequest {
  imgPaths: string[];
  spacing: number;
  collageGrid: "3x2" | "3x3";
}

export interface ImageResponse {
  img: Blob;
  name: string;
}
