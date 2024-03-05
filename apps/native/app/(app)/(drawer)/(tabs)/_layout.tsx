import {
  PersonStanding,
  Gamepad2,
  BookOpen,
  Home,
} from "@tamagui/lucide-icons";
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
          backgroundColor: "hsl(212, 35.0%, 9.2%)",
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          header: Header,
          headerShown: true,
          title: "Strona główna",
          tabBarIcon: () => <Home width={16} height={16} color="white" />,
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
        name="(authorized)/collection"
        options={{
          headerShown: false,
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
        name="(authorized)/games"
        options={{
          headerShown: false,
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
        name="(authorized)/friends"
        options={{
          headerShown: false,
          title: "Znajomi",
          tabBarIcon: () => (
            <PersonStanding width={16} height={16} color="white" />
          ),
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
