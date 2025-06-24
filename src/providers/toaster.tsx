import React, { ReactNode } from "react";
import { Toaster } from "sonner-native";
import { useTheme } from "./theme";

const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const { dark } = useTheme();
  return (
    <>
      {children}
      <Toaster
        theme={dark ? "dark" : "light"}
        visibleToasts={3}
        position="top-center"
        offset={0}
        closeButton
        swipeToDismissDirection={"left"}
        autoWiggleOnUpdate="toast-change"
      />
    </>
  );
};

export default ToasterProvider;
