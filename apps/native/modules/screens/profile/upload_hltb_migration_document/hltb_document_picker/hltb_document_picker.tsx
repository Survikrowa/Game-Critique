import { ActivityIndicator } from "react-native";
import { Text } from "ui/typography/text";

import { useHltbDocumentPicker } from "./use_hltb_document_picker";

import { truncateString } from "@/modules/strings/truncate_string";
import { Button, ButtonText } from "@/ui/forms/button/button";
import { VStack } from "@/ui/layout/vstack/vstack";

type HltbDocumentPickerProps = {
  buttonVisible: boolean;
};
export const HltbDocumentPicker = ({
  buttonVisible,
}: HltbDocumentPickerProps) => {
  const { pickDocument, document, uploadDocument, isUploadingFile } =
    useHltbDocumentPicker();
  if (isUploadingFile) {
    return <ActivityIndicator size="large" color="#3B82F6" />;
  }
  if (!buttonVisible) return null;
  return (
    <VStack className="gap-2">
      <Button
        action="primary"
        onPress={document ? uploadDocument : pickDocument}
      >
        <ButtonText>
          {document ? "Rozpocznij proces migracji" : "Wybierz plik"}
        </ButtonText>
      </Button>
      {document && (
        <Text size="small" weight="semiBold" color="primary">
          Wybrano: {truncateString(document.name, 20)}
        </Text>
      )}
    </VStack>
  );
};
