import { BaseScreenLayout } from "../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { UploadHltbMigrationDocument } from "../../../../../modules/screens/profile/upload_hltb_migration_document/upload_hltb_migration_document";

const HltbScreen = () => {
  return (
    <BaseScreenLayout>
      <UploadHltbMigrationDocument />
    </BaseScreenLayout>
  );
};

export default HltbScreen;
