import { FontSource } from "expo-font";

export function pickFontAssets(mod: Record<string, unknown>, prefix: string) {
  return Object.fromEntries(
    Object.entries(mod).filter(
      ([key, value]) => key.startsWith(prefix) && typeof value === "number" // FontSource ⇒ number im JS-Bundle
    )
  ) as Record<string, FontSource>;
}
