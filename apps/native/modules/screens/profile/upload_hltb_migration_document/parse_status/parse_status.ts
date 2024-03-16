import { MigrationStatus } from "../../../../../__generated__/types";

export const parseStatus = (status: MigrationStatus | null | undefined) => {
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
