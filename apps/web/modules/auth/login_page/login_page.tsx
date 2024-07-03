import { Divider, Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { AppLogo } from "../../ui/icons/app_logo";
import { GoogleIcon } from "../../ui/icons/google_icon";
export const LoginPage = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <AppLogo />
      <Card className="max-w-[550px] w-full flex items-center justify-center">
        <CardHeader className="flex items-center justify-center">
          <p className="text-2xl">GameCritque - Admin Panel</p>
        </CardHeader>
        <Divider />
        <CardBody className="max-w-min">
          <Button
            fullWidth={false}
            href="/api/auth/login"
            as={Link}
            color="primary"
            showAnchorIcon
            variant="solid"
            anchorIcon={<GoogleIcon />}
          >
            Log in with Google
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
