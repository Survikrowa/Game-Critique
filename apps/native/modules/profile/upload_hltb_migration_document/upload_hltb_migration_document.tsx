import { RefreshCcw } from "@tamagui/lucide-icons";
import { Card } from "tamagui";
import { ButtonWithIcon } from "ui/forms/button_icon";
import { Text } from "ui/typography/text";

import { HltbDocumentPicker } from "./hltb_document_picker/hltb_document_picker";
import { useMigrationStatus } from "./use_migration_status/use_migration_status";
import { MigrationStatus } from "../../../__generated__/types";

export const UploadHltbMigrationDocument = () => {
  const migrationStatusQuery = useMigrationStatus();

  const status = migrationStatusQuery.data?.migrationStatus?.status;

  const buttonVisible =
    status !== MigrationStatus.Finished &&
    status !== MigrationStatus.InProgress;

  return (
    <Card padding={8} backgroundColor="$color.container">
      <Card.Header gap={24}>
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
            icon={<RefreshCcw />}
          />
        )}
      </Card.Header>
    </Card>
  );
};

const parseStatus = (status: MigrationStatus | null | undefined) => {
  switch (status) {
    case MigrationStatus.InProgress:
      return "Wysłano plik";
    case MigrationStatus.Finished:
      return "Plik przetworzony";
    case MigrationStatus.Failed:
      return "Błąd przetwarzania pliku";
    default:
      return "Nie wysłano pliku";
  }
};
