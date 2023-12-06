import { Link } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  return (
    <Text>
      Auth Page
      <Link href="/home">Zaloguj się</Link>
    </Text>
  );
}
