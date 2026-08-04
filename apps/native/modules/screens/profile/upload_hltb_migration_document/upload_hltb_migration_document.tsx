import { RefreshCcw } from "lucide-react-native";
import { ButtonWithIcon } from "ui/forms/button_icon";
import { Text } from "ui/typography/text";

import { HltbDocumentPicker } from "./hltb_document_picker/hltb_document_picker";
import { parseStatus } from "./parse_status/parse_status";
import { useMigrationStatus } from "./use_migration_status/use_migration_status";
import { MigrationStatus } from "../../../../__generated__/types";

import { Card } from "@/ui/panels/card/card";
import { VStack } from "@/ui/layout/vstack/vstack";

export const UploadHltbMigrationDocument = () => {
  const migrationStatusQuery = useMigrationStatus();

  const status = migrationStatusQuery.data?.migrationStatus?.status;

  const buttonVisible =
    status !== MigrationStatus.Finished &&
    status !== MigrationStatus.InProgress;

  return (
    <Card className="p-2">
      <VStack className="gap-6">
        {buttonVisible && (
          <>
            <Text size="medium" weight="bold" color="primary">
              Wybierz swój plik pobrany z profilu HLTB
            </Text>
            <HltbDocumentPicker buttonVisible={Boolean(buttonVisible)} />
          </>
        )}
        <Text size="medium" weight="normal" color="primary">
          Status:{" "}
          {parseStatus(migrationStatusQuery.data?.migrationStatus?.status)}
        </Text>
        {status !== MigrationStatus.Finished && (
          <ButtonWithIcon
            onPress={() => migrationStatusQuery.refetch()}
            icon={<RefreshCcw size={16} color="#3B82F6" />}
          />
        )}
      </VStack>
    </Card>
  );
};
