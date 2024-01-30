import { AuthProtectedLayout } from "../../../modules/auth/auth_protected_layout/auth_protected_layout";

const UserProfileLayout = () => {
  return (
    <AuthProtectedLayout validate={(user) => Boolean(user)} redirectTo="/" />
  );
};

export default UserProfileLayout;
