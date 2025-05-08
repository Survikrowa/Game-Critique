import { Search } from "@tamagui/lucide-icons";
import { ReactNode, useRef } from "react";
import { Animated, TextInput, StyleSheet } from "react-native";
import { View, Text, styled } from "tamagui";

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
  const onChangeText = (text: string) => {
    onChange(text);
  };
  const onFocus = () => {
    moveTextTop();
  };
  const onBlur = () => {
    if (!value) {
      moveTextBottom();
    }
  };
  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -14],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };
  return (
    <Container>
      <InputContainer
        borderColor={errorMessage ? "$red4" : "#bdbdbd"}
        paddingRight={icon ? 8 : 4}
      >
        <Animated.View style={[styles.animatedStyle, animStyle]}>
          <Label color={errorMessage ? "$red8" : "black"}>{label}</Label>
        </Animated.View>
        <CustomInput
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
          disableFullscreenUI
          inputMode={inputMode}
        />
        {icon ? <IconContainer>{icon}</IconContainer> : null}
      </InputContainer>
      {errorMessage ? (
        <ErrorMessage marginTop={5}>{errorMessage}</ErrorMessage>
      ) : null}
    </Container>
  );
};

const Container = styled(View, {
  flex: 1,
  borderColor: "$red4",
  zIndex: 200,
});

const InputContainer = styled(View, {
  backgroundColor: "#fff",
  borderWidth: 2,
  borderRadius: 8,
  padding: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 200,
});

const CustomInput = styled(TextInput, {
  fontSize: 13,
  padding: 4,
  paddingLeft: 16,
  color: "#000",
  justifyContent: "center",
  display: "flex",
  flex: 1,
});

const Label = styled(Text, {
  fontSize: 13,
  backgroundColor: "#fff",
  padding: 2,
  zIndex: 300,
  opacity: 0.99,
  pointerEvents: "none",
});

const ErrorMessage = styled(Text, {
  width: "100%",
  color: "red",
  alignSelf: "center",
  paddingHorizontal: 10,
});

const IconContainer = styled(View, {
  maxWidth: 42,
  maxHeight: 42,
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const styles = StyleSheet.create({
  animatedStyle: {
    top: 0,
    left: 8,
    position: "absolute",
    zIndex: 300,
    backgroundColor: "#fff",
    pointerEvents: "none",
  },
});
