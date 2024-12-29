import { CardContent } from "@/packages/ui/surfaces/card.tsx";

export const UserAuthenticatingLoader = () => {
  return (
    <CardContent>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </CardContent>
  );
};
