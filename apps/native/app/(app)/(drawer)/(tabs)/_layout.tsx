import { BookOpen } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useAuth0 } from "react-native-auth0";

import { GoBackHeader } from "../../../../modules/layouts/go_back_header/go_back_header";
import { Header } from "../../../../modules/layouts/header/header";
import { Text } from "../../../../ui/typography/text";

const TabsLayout = () => {
  const { user } = useAuth0();
  return (
    <Tabs
      screenOptions={({ route }) => ({
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
          header: () => <GoBackHeader goBackUrl="/collection/" />,
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
    </Tabs>
  );
};

export default TabsLayout;
