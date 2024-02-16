import { zodResolver } from "@hookform/resolvers/zod";
import { useToastController } from "@tamagui/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateUserProfile } from "./use_update_user_profile/use_update_user_profile";

const ProfileEditorFormFields = z.object({
  name: z
    .string()
    .min(5, "Nazwa użytkownika musi posiadać minimum 5 znaków")
    .max(25, "Nazwa użytkownika nie może przekraczać 25 znaków"),
  avatar: z
    .string()
    .min(1, "Nie załączono żadnego avataru")
    .url({ message: "Invalid URL" }),
});

export type ProfileEditorFields = z.infer<typeof ProfileEditorFormFields>;

type UseProfileEditorFormArgs = {
  defaultValues: ProfileEditorFields;
  onSubmit: () => void;
};

export const useProfileEditorForm = ({
  defaultValues,
  onSubmit,
}: UseProfileEditorFormArgs) => {
  const methods = useForm<ProfileEditorFields>({
    defaultValues,
    resolver: zodResolver(ProfileEditorFormFields),
  });

  const toast = useToastController();

  const [updateProfile, { loading }] = useUpdateUserProfile();

  const [isPhotoEditorVisible, setIsPhotoEditorVisible] = useState(false);

  const handlePhotoEditorVisibilityChange = () => {
    setIsPhotoEditorVisible((isPhotoEditorVisible) => !isPhotoEditorVisible);
  };

  const handleProfileEditorFormSubmit = methods.handleSubmit(async (data) => {
    const { data: updateProfileStatus } = await updateProfile({
      variables: {
        input: {
          name: data.name,
          avatarUrl: data.avatar,
        },
      },
    });
    if (updateProfileStatus?.updateProfileInfo.success) {
      toast.show("Udało się!", {
        description: "Twoje dane zostały zaktualizowane",
        variant: "success",
      });
      return onSubmit();
    }
    toast.show("Wystąpił błąd", {
      description: "Nie udało się zaktualizować Twoich danych",
      variant: "error",
    });
  });
  return {
    methods,
    handleProfileEditorFormSubmit,
    handlePhotoEditorVisibilityChange,
    isPhotoEditorVisible,
    isUpdatingUserProfile: loading,
  };
};
