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

    const changedPhoto = await photo.composite(logo, 0, 0, {
      mode: jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 0.5,
    });
    changedPhoto.writeAsync(`${PHOTOS_OUTPUT_DIR}/${photoFileName}`);
  }
})();
