import { BookOpen, Gamepad2 } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { Text } from "ui/typography/text";

import { GoBackHeader } from "../../../../modules/layouts/go_back_header/go_back_header";
import { Header } from "../../../../modules/layouts/header/header";

const TabsLayout = () => {
  const { user } = useAuth0();
  return (
    <Tabs
      screenOptions={() => ({
        tabBarStyle: {
          height: 64,
          display: user ? "flex" : "none",
          backgroundColor: "black",
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          header: Header,
          headerShown: true,
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/collection/new_collection"
        options={{
          header: () => (
            <GoBackHeader
              goBackUrl="/collection/"
              text="Tworzenie nowej kolekcji"
            />
          ),
          headerShown: true,
          tabBarStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/collection/index"
        options={{
          header: Header,
          headerShown: true,
          title: "Kolekcja",
          tabBarIcon: () => <BookOpen width={16} height={16} color="white" />,
          tabBarLabel: ({ focused, children }) => {
            return (
              <Text
                size="small"
                weight="bold"
                color={focused ? "active" : "white"}
              >
                {children}
              </Text>
            );
          },
          tabBarItemStyle: {
            padding: 8,
          },
          tabBarLabelStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/games/index"
        options={{
          header: Header,
          headerShown: true,
          title: "Gry",
          tabBarIcon: () => <Gamepad2 width={16} height={16} color="white" />,
          tabBarLabel: ({ focused, children }) => {
            return (
              <Text
                size="small"
                weight="bold"
                color={focused ? "active" : "white"}
              >
                {children}
              </Text>
            );
          },
          tabBarItemStyle: {
            padding: 8,
          },
          tabBarLabelStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/collection/[id]/index"
        options={{
          header: ({ options }) => (
            <GoBackHeader goBackUrl="/collection/" text={options.title || ""} />
          ),
          headerShown: true,
          tabBarStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="game/[game_id]/index"
        options={{
          header: Header,
          headerShown: true,

          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/collection/collection_add_form/[id]/index"
        options={{
          header: Header,
          headerShown: true,

          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/games/games_status_add_form/[hltb_id]/index"
        options={{
          header: Header,
          headerShown: true,

          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/games/games_status_info/[games_status_id]"
        options={{
          header: () => (
            <GoBackHeader goBackUrl="/games/" text="Szczegóły gry" />
          ),
          headerShown: true,
          tabBarStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/games/games_status_edit_form/[game_status_id]/index"
        options={{
          header: () => (
            <GoBackHeader goBackUrl="/games/" text="Edytujesz grę" />
          ),
          headerShown: true,
          tabBarStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
