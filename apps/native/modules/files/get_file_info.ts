import * as FileSystem from "expo-file-system";
export const getFileInfo = async (fileURI: string) => {
  return FileSystem.getInfoAsync(fileURI);
};
