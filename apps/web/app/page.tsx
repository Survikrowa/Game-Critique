import { AppProviders } from "@/packages/providers/providers";
import "../styles/global.css";
import { LoginPage } from "../modules/auth/login_page/login_page";
import { getSession } from "@auth0/nextjs-auth0";
const Web = async () => {
  const user = await getSession();
  console.log(user);
  return (
    <AppProviders>
      <main className="dark text-foreground bg-background h-full">
        <LoginPage />
      </main>
    </AppProviders>
  );
};

export default Web;
