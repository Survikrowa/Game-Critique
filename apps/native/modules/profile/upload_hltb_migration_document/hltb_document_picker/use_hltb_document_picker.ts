import { useApolloClient } from "@apollo/client";
import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerAsset } from "expo-document-picker/src/types";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
export const useHltbDocumentPicker = () => {
  const [isUploadingFile, setIsUploadingFileSystem] = useState(false);
  const [document, setDocument] = useState<DocumentPickerAsset | null>(null);
  const graphQLClient = useApolloClient();
  const uploadDocument = async () => {
    try {
      const token = await SecureStore.getItemAsync("oauthToken");
      if (!document) return;
      setIsUploadingFileSystem(true);
      await FileSystem.uploadAsync(
        "http://localhost:3000/hltb/migrate",
        document.uri,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file",
        },
      );
      setIsUploadingFileSystem(false);
      graphQLClient.refetchQueries({
        include: ["MigrationStatus"],
      });
    } catch (e) {
      setIsUploadingFileSystem(false);
    }
  };
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "text/csv",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!result.canceled) {
      setDocument(result.assets[0]);
    }
  };
  return {
    pickDocument,
    document,
    uploadDocument,
    isUploadingFile,
  };
};
