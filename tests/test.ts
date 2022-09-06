import { assertStrictEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import { CollageImage } from "../supabase/functions/_utils/imageWorks.ts";

const getFiles = async (path = "assets") => {
  const fileNames = [];
  for await (const { isFile, name } of Deno.readDir(path)) {
    isFile && fileNames.push("assets/" + name);
  }
  return Promise.all(fileNames.map((val) => Deno.readFile(val)));
};

Deno.test({
  name: "First test",
  permissions: { read: true },
  fn: async () => {
    try {
      const files = await getFiles();
      const alpha = new CollageImage(files.slice(-6), {
        width: 3,
        height: 2,
        imageWidth: 500,
        imageHeight: 400,
        spacing: 1.4,
      });
      const finalImage = [await alpha.collageMaker()];
      assertStrictEquals<number>(finalImage.length, 1);
    } catch (error) {
      throw error;
    }
  },
});

Deno.test({
  name: "Second test",
  permissions: { read: true },
  fn: async () => {
    try {
      const files = await getFiles();
      const alpha = new CollageImage(files.slice(-9), {
        width: 3,
        height: 3,
        imageWidth: 500,
        imageHeight: 400,
        spacing: 1.4,
      });
      const finalImage = [await alpha.collageMaker()];
      assertStrictEquals<number>(finalImage.length, 1);
    } catch (error) {
      throw error;
    }
  },
});
