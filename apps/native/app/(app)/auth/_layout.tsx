import { AuthProtectedLayout } from "../../../modules/screens/auth/auth_protected_layout/auth_protected_layout";

const AuthLayout = () => {
  return <AuthProtectedLayout validate={(user) => !user} redirectTo="/" />;
};

export default AuthLayout;
