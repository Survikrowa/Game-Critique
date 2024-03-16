import { BaseScreenLayout } from "../../../modules/layouts/base_screen_layout/base_screen_layout";
import { AuthScreen } from "../../../modules/screens/auth/auth_screen";

const Auth = () => {
  return (
    <BaseScreenLayout>
      <AuthScreen />
    </BaseScreenLayout>
  );
};

export default Auth;
