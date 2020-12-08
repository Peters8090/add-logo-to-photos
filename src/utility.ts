import fs from "promise-fs";

export const mkDirIfDoesntExist = async (fileName: string) => {
  try {
    await fs.mkdir(fileName);
  } catch (e) {
    console.log(e);
  }
};

export const doesFileExist = async (fileName: string) => {
  try {
    await fs.stat(fileName);
    return true;
  } catch (error) {
    return false;
  }
};
