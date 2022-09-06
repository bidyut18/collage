import { SuperStorage } from "../_utils/storageWorks.ts";
import { supabaseClient } from "../_shared/adminSuper.ts";
import { CollageImage } from "../_utils/imageWorks.ts";

export const collageCreation = async (
  width: number,
  height: number,
  images: string[],
  spacing: number,
  folderName: string,
) => {
  const storage = new SuperStorage(supabaseClient, "production");
  try {
    const imgs = await storage.findImages({
      folder: folderName,
      imgNames: images,
    });
    const collage = new CollageImage(imgs, {
      spacing,
      height,
      width,
      imageWidth: 500,
      imageHeight: 400,
    });
    const img = await collage.collageMaker();
    return img;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
