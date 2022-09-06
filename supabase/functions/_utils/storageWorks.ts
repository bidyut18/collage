import { SupabaseClient } from "../_shared/deps.ts";
import { rootFilePath } from "../_shared/adminSuper.ts";
import { FindOptions, WithRequiredFindOptions } from "../_shared/types.ts";

export class SuperStorage {
  superAdminClient: SupabaseClient;
  bucket: string;
  constructor(client: SupabaseClient, bucketName: string) {
    this.superAdminClient = client;
    this.bucket = bucketName;
  }
  /**
   * Download Multiple photos
   */
  async findImages(
    options: WithRequiredFindOptions<FindOptions, "imgNames" | "folder">,
  ): Promise<Uint8Array[]> {
    const files = await Promise.all(
      options.imgNames.map(async (imageName: string) => {
        return await this.downloadImage({
          folderPath: this.imagePathConverter(options.folder, imageName),
        });
      }),
    );
    return files;
  }
  /**
   * Download a single image.
   */
  async downloadImage(
    options: WithRequiredFindOptions<FindOptions, "folderPath">,
  ): Promise<Uint8Array> {
    const { data, error } = await this.superAdminClient.storage
      .from(this.bucket)
      .download(options.folderPath);
    if (error) {
      throw new Error("Error Occured at file download");
    }
    const buffer = await data?.arrayBuffer()!;
    return new Uint8Array(buffer);
  }

  private imagePathConverter(folder: string, name: string): string {
    return `${rootFilePath}/${folder}/${name}`;
  }
  /*
   * Deletes the uploaded images
   */
  async deleteImages(img_folder: string) {
    // Delete a list of files
    const { error } = await this.superAdminClient.storage
      .from(this.bucket)
      .remove([`${rootFilePath}/${img_folder}/*`]);
    if (error) {
      throw new Error("Error occured in deleting images");
    } else {
      return { task: "Deleted files", time: new Date().toUTCString() };
    }
  }
}
