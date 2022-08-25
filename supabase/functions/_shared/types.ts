export interface UserOptions {
  suapbaseSouces: string[];
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
