import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileEditorFormFields = z.object({
  name: z.string(),
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
  const { control, handleSubmit } = useForm<ProfileEditorFields>({
    defaultValues,
    resolver: zodResolver(ProfileEditorFormFields),
  });

  const [isPhotoEditorVisible, setIsPhotoEditorVisible] = useState(false);

  const handlePhotoEditorVisibilityChange = () => {
    setIsPhotoEditorVisible((isPhotoEditorVisible) => !isPhotoEditorVisible);
  };

  const handleProfileEditorFormSubmit = handleSubmit((data) => {
    onSubmit();
    console.log(data);
  });
  return {
    control,
    handleProfileEditorFormSubmit,
    handlePhotoEditorVisibilityChange,
    isPhotoEditorVisible,
  };
};
