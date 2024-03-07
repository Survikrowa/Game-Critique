import { AuthPage } from "../../../modules/auth/auth_page";
import { BaseScreenLayout } from "../../../modules/layouts/base_screen_layout/base_screen_layout";

const AuthScreen = () => {
  return (
    <BaseScreenLayout>
      <AuthPage />
    </BaseScreenLayout>
  );
};

export default AuthScreen;
