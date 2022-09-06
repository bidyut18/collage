//Importing all Requirements

import {
  CanvasRenderingContext2D,
  createCanvas,
  EmulatedCanvas2D,
  loadImage,
} from "../_shared/deps.ts";
import { CollageOptions } from "../_shared/types.ts";

export class CollageImage {
  imgBufferList: Uint8Array[];
  imgOptions: CollageOptions;
  private canvasFillStyle = "#fff";
  constructor(img_list: Uint8Array[], options: CollageOptions) {
    this.imgBufferList = img_list;
    this.imgOptions = options;
  }
  private canvasSizeCalculate(): number[] {
    const canvasWidth = this.imgOptions.width * this.imgOptions.imageWidth +
      (this.imgOptions.width - 1) * this.imgOptions.spacing;
    const canvasHeight = this.imgOptions.height * this.imgOptions.imageHeight +
      (this.imgOptions.height - 1) * this.imgOptions.spacing;

    return [Math.floor(canvasWidth), Math.floor(canvasHeight)];
  }
  /**
   * Calculate the x,y coordinates of the next photo to be drawn
   */
  private coordinateCalculator(i: number): number[] {
    const x = (i % this.imgOptions.width) *
      (this.imgOptions.imageWidth + this.imgOptions.spacing);
    const y = Math.floor(i / this.imgOptions.width) *
      (this.imgOptions.imageHeight + this.imgOptions.spacing);
    return [Math.floor(x), Math.floor(y)];
  }
  /**
   * Returns Canvas rendering context
   */
  private canvasCreation(
    width: number,
    height: number,
  ): [CanvasRenderingContext2D, EmulatedCanvas2D] {
    const imgcanvas = createCanvas(width, height);
    const ctx = imgcanvas.getContext("2d");
    ctx.fillStyle = this.canvasFillStyle;
    ctx.fillRect(0, 0, width, height);
    return [ctx, imgcanvas];
  }
  async collageMaker() {
    const [width, height] = this.canvasSizeCalculate();
    const [renderer, canvas] = this.canvasCreation(width, height);

    for (let i = 0; i < this.imgBufferList.length; i++) {
      //   await Deno.writeFile(`experimental/image_${i}.png`, imgcanvas.toBuffer());
      const img = await loadImage(this.imgBufferList[i]);
      const [x, y] = this.coordinateCalculator(i);
      renderer.drawImage(
        img,
        x,
        y,
        this.imgOptions.imageWidth,
        this.imgOptions.imageHeight,
      );
    }

    return canvas.toBuffer();
  }
}
