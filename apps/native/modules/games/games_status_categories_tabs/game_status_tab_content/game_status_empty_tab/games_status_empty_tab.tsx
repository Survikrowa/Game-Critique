import { View } from "tamagui";
import { Text } from "ui/typography/text";
export const GamesStatusEmptyTab = () => {
  return (
    <View
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Text size="large" weight="bold" color="primary">
        Brak gier? Dodaj coś!
      </Text>
    </View>
  );
};
