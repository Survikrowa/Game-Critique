import { useMigrationStatusQuery } from "./migration_status_query.generated";

export const useMigrationStatus = () => {
  return useMigrationStatusQuery();
};
