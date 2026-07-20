import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { FabLabel } from "./fab";

import { haptic } from "@/modules/haptics/haptic";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const mainButtonStyle = tva({
  base: "bg-primary-500 rounded-full p-4 flex-row items-center justify-center shadow-hard-2",
});

const actionItemStyle = tva({
  base: "flex-row items-center gap-2 rounded-full bg-background-0 px-4 py-3 shadow-hard-2",
});

type LucideIcon = typeof Plus;

type SpeedDialAction = {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
};

type SpeedDialFabProps = {
  actions: SpeedDialAction[];
};

export const SpeedDialFab = ({ actions }: SpeedDialFabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotate = useSharedValue(0);
  const backdropOpacity = useSharedValue(0);

  const toggleMenu = () => {
    haptic.light();
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    rotate.value = withSpring(newIsOpen ? 45 : 0, {
      damping: 10,
      stiffness: 300,
    });
    backdropOpacity.value = withTiming(newIsOpen ? 1 : 0, { duration: 200 });
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      rotate.value = withSpring(0, { damping: 10, stiffness: 300 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <>
      {isOpen && (
        <Animated.View style={backdropStyle} className="absolute inset-0 z-10">
          <Pressable className="flex-1" onPress={closeMenu} />
        </Animated.View>
      )}
      <View className="absolute bottom-4 right-4 z-20 items-end">
        {isOpen && (
          <View className="mb-3 gap-3">
            {[...actions].reverse().map((action) => (
              <Pressable
                key={action.label}
                className={actionItemStyle({})}
                onPress={() => {
                  closeMenu();
                  action.onPress();
                }}
              >
                <action.icon size={20} color="#3B82F6" />
                <FabLabel>{action.label}</FabLabel>
              </Pressable>
            ))}
          </View>
        )}
        <AnimatedPressable
          className={mainButtonStyle({})}
          style={rotateStyle}
          onPress={toggleMenu}
        >
          <Plus size={20} color="#fff" />
        </AnimatedPressable>
      </View>
    </>
  );
};
