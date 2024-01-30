import { BookOpen } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { XStack } from "tamagui";

import { Text } from "../../../../ui/typography/text";

const TabsLayout = () => {
  const { user } = useAuth0();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
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
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="(authorized)/collection/index"
        options={{
          title: "Kolekcja",
          tabBarIcon: () => <BookOpen width={16} height={16} color="white" />,
          tabBarLabel: ({ focused, children }) => {
            return (
              <Text
                size="small"
                weight="bold"
                color={focused ? "active" : "primary"}
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
    </Tabs>
  );
};

export default TabsLayout;
