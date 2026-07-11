import { ReactNode, useRef } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native";

type InputProps = {
  onChange: (text: string) => void;
  value: string;
  label: string;
  errorMessage?: string;
  inputMode?: "text" | "numeric";
  icon?: ReactNode;
};

export const Input = ({
  onChange,
  value,
  label,
  errorMessage,
  inputMode = "text",
  icon,
}: InputProps) => {
  const moveText = useRef(new Animated.Value(value ? 1 : 0)).current;

  const onFocus = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onBlur = () => {
    if (!value) {
      Animated.timing(moveText, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -14],
  });

  return (
    <View className="flex-1 z-[200]">
      <View
        className={[
          "flex-row items-center justify-between",
          "bg-background-50 border-2 rounded-xl p-1",
          errorMessage ? "border-error-400" : "border-outline-200",
          icon ? "pr-2" : "pr-1",
        ].join(" ")}
      >
        <Animated.View
          style={[styles.labelContainer, { transform: [{ translateY: yVal }] }]}
        >
          <Text
            className={[
              "text-[13px] bg-background-50 px-1 z-[300] pointer-events-none",
              errorMessage ? "text-error-400" : "text-typography-500",
            ].join(" ")}
          >
            {label}
          </Text>
        </Animated.View>
        <TextInput
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChange}
          disableFullscreenUI
          inputMode={inputMode}
          className="text-[13px] text-typography-100 flex-1 p-1 pl-4"
        />
        {icon ? (
          <View className="w-[42px] h-[42px] items-center justify-center">
            {icon}
          </View>
        ) : null}
      </View>
      {errorMessage ? (
        <Text className="text-error-400 text-xs px-3 mt-1">{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    top: 0,
    left: 8,
    position: "absolute",
    zIndex: 300,
    pointerEvents: "none",
  },
});
