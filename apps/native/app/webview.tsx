import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const WebViewScreen = () => {
  const { url } = useLocalSearchParams<{ url: string }>();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <WebView source={{ uri: url }} />
    </SafeAreaView>
  );
};

export default WebViewScreen;
