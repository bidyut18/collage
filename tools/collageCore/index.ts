//Importing all Requirements
import {
  createCanvas,
  loadImage,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";

//Image imports
const imag1 = await Deno.readFile("three.jpg");
const imag2 = await Deno.readFile("two.jpg");
const imag3 = await Deno.readFile("one.jpg");
const imag4 = await Deno.readFile("four.jpg");
const imag5 = await Deno.readFile("five.jpg");
const imag6 = await Deno.readFile("six.jpg");

const img_arr = [imag2, imag1, imag5, imag4, imag3, imag6];

const canvasWidth = 3 * 500 + (3 - 1) * 2;
const canvasHeight = 0 + 2 * 400 + (2 - 1) * 2; //**(experimental);

const imgcanvas = createCanvas(canvasWidth, canvasHeight);

const ctx = imgcanvas.getContext("2d");

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

for (let i = 0; i < 6; i++) {
  const image_name = img_arr[i];
  //   await Deno.writeFile(`experimental/image_${i}.png`, imgcanvas.toBuffer());
  const img = await loadImage(image_name);

  const x = (i % 3) * (500 + 2);
  const y = Math.floor(i / 3) * (400 + 2);
  ctx.drawImage(img, x, y, 500, 400);
}

await Deno.writeFile("image.png", imgcanvas.toBuffer());
