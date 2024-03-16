import { Button, Spinner, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { useHltbDocumentPicker } from "./use_hltb_document_picker";
import { truncateString } from "../../../../strings/truncate_string";

type HltbDocumentPickerProps = {
  buttonVisible: boolean;
};
export const HltbDocumentPicker = ({
  buttonVisible,
}: HltbDocumentPickerProps) => {
  const { pickDocument, document, uploadDocument, isUploadingFile } =
    useHltbDocumentPicker();
  if (isUploadingFile) {
    return <Spinner size="large" />;
  }
  if (!buttonVisible) return null;
  return (
    <YStack gap={8}>
      <Button
        color="white"
        backgroundColor="black"
        borderColor="white"
        onPress={document ? uploadDocument : pickDocument}
      >
        {document ? "Rozpocznik proces migracji" : "Wybierz plik"}
      </Button>
      {document && (
        <Text size="small" weight="semiBold" color="primary">
          Wybrano: {truncateString(document.name, 20)}
        </Text>
      )}
    </YStack>
  );
};
