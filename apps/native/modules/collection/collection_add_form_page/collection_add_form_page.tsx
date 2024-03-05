import { Redirect, useLocalSearchParams } from "expo-router";
import { Card, Spinner, View, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { CollectionAddForm } from "./collection_add_form/collection_add_form";
import { useGetGameInfo } from "../../game/use_get_game_info/use_get_game_info";

export const CollectionAddFormPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const gameInfoQuery = useGetGameInfo(id);

  if (!id) {
    return <Redirect href="/" />;
  }

  if (gameInfoQuery.loading) {
    return <Spinner size="large" />;
  }
  return (
    <YStack justifyContent="flex-start">
      <Card height="100%" backgroundColor="$color.container">
        <Card.Background />
        <Card.Header gap={16}>
          <View alignItems="center">
            <Text size="medium" weight="bold" color="primary">
              Dodajesz gre: {gameInfoQuery.data?.game.name}
            </Text>
          </View>

          <CollectionAddForm gameId={id} />
        </Card.Header>
      </Card>
    </YStack>
  );
};
