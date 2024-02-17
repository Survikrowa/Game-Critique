import { NativeStackScreenProps } from "react-native-screens/native-stack";

type RootStackParamList = {
  Home: undefined;
  UserProfile: { oauthId: string; take: string; skip: string };
};
export type UserProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "UserProfile"
>;
