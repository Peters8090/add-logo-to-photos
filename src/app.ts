import jimp from "jimp";
import fs from "promise-fs";
import rmfr from "rmfr";
import { mkDirIfDoesntExist } from "./utility";

(async () => {
  const PHOTOS_INPUT_DIR = "bez logo";
  const PHOTOS_OUTPUT_DIR = "z logo";
  const LOGO_DIR = "logo.png";

  const LOGO_MARGIN_PERCENTAGE = 5;

  await rmfr(PHOTOS_OUTPUT_DIR);
  await mkDirIfDoesntExist(PHOTOS_INPUT_DIR);
  await mkDirIfDoesntExist(PHOTOS_OUTPUT_DIR);

  const inputPhotos = await fs.readdir(PHOTOS_INPUT_DIR);

  const logo = await jimp.read(LOGO_DIR);

  for (const photoFileName of inputPhotos) {
    const photo = await jimp.read(`${PHOTOS_INPUT_DIR}/${photoFileName}`);

    logo.resize(photo.bitmap.width / 10, jimp.AUTO);

    const xMargin = (photo.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    const yMargin = (photo.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

    const X = photo.bitmap.width - logo.bitmap.width - xMargin;
    const Y = photo.bitmap.height - logo.bitmap.height - yMargin;

    await photo
      .composite(logo, X, Y, {
        mode: jimp.BLEND_SCREEN,
        opacitySource: 0.1,
        opacityDest: 1,
      })
      .writeAsync(`${PHOTOS_OUTPUT_DIR}/${photoFileName}`);
  }
})();
