import React from "react";
import { useTheme } from "@/providers/theme";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { readableTextColor } from "@/utils/color";

interface Props {
  onPress: () => void;
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
}

const OAuthBtn: React.FC<Props> = ({ onPress, iconName }) => {
  const { colors } = useTheme();
  let bgColor: string;

  switch (iconName) {
    case "google":
      // Google Red from official Google logo palette
      bgColor = "#DB4437"; // Red segment of Google 'G' logo ([usbrandcolors.com](https://usbrandcolors.com/google-colors/?utm_source=chatgpt.com))
      break;
    case "apple":
      // Apple black as per Sign in with Apple badge guideline
      bgColor = "#000000"; // Apple badge uses black background ([developer.apple.com](https://developer.apple.com/app-store/marketing/guidelines/?utm_source=chatgpt.com))
      break;
    case "facebook":
      // Facebook official blue
      bgColor = "#1877F2"; // Facebook brand color ([brandcolorcode.com](https://www.brandcolorcode.com/facebook?utm_source=chatgpt.com))
      break;
    case "twitter":
      // Twitter official blue
      bgColor = "#1DA1F2"; // Twitter brand color ([materialui.co](https://materialui.co/socialcolors/twitter?utm_source=chatgpt.com))
      break;
    default:
      // Fallback: theme foreground
      bgColor = colors.foreground;
  }

  const iconColor = readableTextColor(bgColor, colors.background, colors.text);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <FontAwesome name={iconName} size={26} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 3,
  } as ViewStyle,
});

export default OAuthBtn;
