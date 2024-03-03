import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";

import { UseUploadPhotoSchema } from "./use_upload_photo.schema";

type UploadPhotoArgs = {
  photo: {
    uri: string;
    name: string;
    type: string;
  };
  transformOptions: {
    width: string;
    height: string;
  };
};

export const useUploadPhoto = () => {
  const uploadPhoto = async ({ photo, transformOptions }: UploadPhotoArgs) => {
    const token = await SecureStore.getItemAsync("oauthToken");
    const data = await FileSystem.uploadAsync(
      `${process.env.EXPO_PUBLIC_BASE_API_URL}/images/upload`,
      photo.uri,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
        parameters: {
          "transformOptions[width]": transformOptions.width,
          "transformOptions[height]": transformOptions.height,
        },
      },
    );
    const body = await JSON.parse(data.body);
    if (body.error) {
      throw new Error(body.message);
    }
    return UseUploadPhotoSchema.parseAsync(body);
  };

  return {
    uploadPhoto,
  };
};
