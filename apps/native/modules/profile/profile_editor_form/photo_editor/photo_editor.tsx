import { useToastController } from "@tamagui/toast";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image } from "tamagui";

import { Text } from "../../../../ui/typography/text";

export const PhotoEditor = () => {
  const [image, setImage] = useState<string | null>(null);
  const toast = useToastController();

  const selectPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,
        quality: 1,
      });
      if (result.canceled) return;
      console.log(result.assets);
      setImage(result.assets.at(0)?.uri || null);
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
      {image && (
        <>
          <Text size="medium" weight="bold" color="primary">
            Twój nowy avatar będzie wyglądał następująco
          </Text>
          <Image source={{ width: 100, height: 120, uri: image }} />
        </>
      )}
    </>
  );
};
