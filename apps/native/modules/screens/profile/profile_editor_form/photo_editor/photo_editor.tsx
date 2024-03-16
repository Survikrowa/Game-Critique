import { useToastController } from "@tamagui/toast";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "tamagui";
import { Text } from "ui/typography/text";

import { getFileInfo } from "../../../../files/get_file_info";
import { useUploadPhoto } from "../../../../photos/use_upload_photo/use_upload_photo";
import { UserAvatar } from "../../../../user/user_avatar/user_avatar";

export const PhotoEditor = () => {
  const { setError, formState, clearErrors, setValue, getValues } =
    useFormContext<{
      avatar: string;
    }>();
  const [image, setImage] = useState<string | null>(getValues("avatar"));
  const toast = useToastController();
  const { uploadPhoto } = useUploadPhoto();

  const selectPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,
        quality: 1,
      });
      if (result.canceled) return;
      const photo = result.assets.at(0);
      if (!photo) {
        setError("avatar", { message: "Nie udało się wybrać zdjęcia" });
        return;
      }
      const photoInfo = await getFileInfo(photo.uri);

      if (photoInfo.exists && Math.floor(photoInfo.size / 1024) > 3096) {
        setError("avatar", { message: "Zdjęcie jest za duże" });
        return;
      }
      clearErrors("avatar");
      const res = await uploadPhoto({
        photo: {
          uri: photo.uri,
          name: photo.fileName || "",
          type: photo.type || "",
        },
        transformOptions: { width: "300", height: "300" },
      });
      setImage(res.photo_url);
      setValue("avatar", res.photo_url);
    } catch (e) {
      toast.show("Nie udało się wybrać zdjęcia", {
        description: "Prawdopodobnie brakuje odpowiednich uprawnien",
        variant: "error",
      });
    }
  };

  return (
    <>
      <Button onPress={selectPhoto}>Wybierz zdjęcie na twój nowy avatar</Button>
      <Text size="medium" weight="bold" color="secondary">
        {formState.errors.avatar && formState.errors.avatar.message}
      </Text>
      {image && (
        <>
          <Text size="medium" weight="bold" color="primary">
            Twój avatar wygląda tak:
          </Text>
          <UserAvatar avatarUrl={image} />
        </>
      )}
    </>
  );
};
