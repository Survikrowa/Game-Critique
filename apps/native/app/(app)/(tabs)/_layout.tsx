import { PersonStanding, Gamepad2, Home, User } from "lucide-react-native";
import { Tabs } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { Text } from "ui/typography/text";

import { GoBackHeader } from "../../../modules/layouts/go_back_header/go_back_header";
import { Header } from "../../../modules/layouts/header/header";

const TAB_BAR_BG = "#0A0F1E";
const ICON_ACTIVE = "#3B82F6";
const ICON_INACTIVE = "#64748B";
const ICON_SIZE = 22;

type TabIconProps = {
  focused: boolean;
  Icon: React.ComponentType<{ size: number; color: string }>;
};

const TabIcon = ({ focused, Icon }: TabIconProps) => (
  <Icon size={ICON_SIZE} color={focused ? ICON_ACTIVE : ICON_INACTIVE} />
);

const TabLabel = ({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) => (
  <Text size="small" weight="bold" color={focused ? "active" : "secondary"}>
    {children}
  </Text>
);

const sharedTabOptions = {
  tabBarItemStyle: { paddingVertical: 6 },
  tabBarLabelStyle: { marginTop: 2 },
};

const TabsLayout = () => {
  const { user } = useAuth0();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 64,
          display: user ? "flex" : "none",
          backgroundColor: TAB_BAR_BG,
          borderTopColor: "#1e2d47",
          borderTopWidth: 1,
          paddingBottom: 4,
        },
        tabBarActiveTintColor: ICON_ACTIVE,
        tabBarInactiveTintColor: ICON_INACTIVE,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          ...sharedTabOptions,
          header: Header,
          headerShown: true,
          title: "Główna",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Home} />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabLabel focused={focused}>{children}</TabLabel>
          ),
        }}
      />
      <Tabs.Screen
        name="(authorized)/games"
        options={{
          ...sharedTabOptions,
          headerShown: false,
          title: "Gry",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Gamepad2} />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabLabel focused={focused}>{children}</TabLabel>
          ),
        }}
      />
      <Tabs.Screen
        name="(authorized)/friends"
        options={{
          ...sharedTabOptions,
          headerShown: false,
          title: "Znajomi",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={PersonStanding} />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabLabel focused={focused}>{children}</TabLabel>
          ),
        }}
      />
      <Tabs.Screen
        name="(authorized)/user"
        options={{
          ...sharedTabOptions,
          headerShown: false,
          title: "Profil",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={User} />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabLabel focused={focused}>{children}</TabLabel>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
