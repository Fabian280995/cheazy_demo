import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const EDGE_FUNCTION_URL = process.env.EXPO_PUBLIC_SUPABASE_TRANSCRIPTION_URL;
const TOKEN = process.env.EXPO_PUBLIC_SUPABASE_EDGE_FUNCTIONS_TOKEN;

export const transcribe = async ({ uri }: { uri: string }): Promise<string> => {
  console.log("Uploading recording to Edge Function:", uri);
  console.log("Edge Function URL:", EDGE_FUNCTION_URL);
  if (!EDGE_FUNCTION_URL) {
    console.error("Edge Function URL is not defined");
    throw new Error("Edge Function URL is not defined");
  }

  if (!TOKEN) {
    console.error("Transcription token is not defined");
    Alert.alert("Transcription token is not defined");
    throw new Error("Transcription token is not defined");
  }

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  // Überprüfe, ob die Datei existiert
  const fileInfo = await FileSystem.getInfoAsync(uri);
  if (!fileInfo.exists) {
    console.error("File does not exist:", uri);
    Alert.alert("File does not exist");
    return "";
  }
  // Überprüfe, ob die Datei nicht leer ist
  if (fileInfo.size === 0) {
    console.error("File is empty:", uri);
    Alert.alert("File is empty");
    return "";
  }
  // Überprüfe die Dateigröße
  if (fileInfo.size > MAX_FILE_SIZE) {
    console.error("File is too large:", fileInfo.size);
    Alert.alert("File is too large");
    return "";
  }

  try {
    // FormData-Objekt erstellen und das File als Objekt anhängen
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "recording.m4a",
      type: "audio/m4a",
    } as any as Blob); // "as any", falls TypeScript Probleme mit dem Objekt hat
    formData.append("language", "de");

    // Hinweis: Den Content-Type Header nicht setzen – das übernimmt das FormData selbst
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${TOKEN}`, // Session.access_token muss hier definiert sein
      },
    });

    if (!response.ok) {
      throw new Error(
        `Transcription failed: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();
    if (String(result.text).includes("Amara.org")) return "";
    return result.text;
  } catch (error) {
    console.error("Error uploading recording:", error);
    throw new Error(
      `Error uploading recording: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  } finally {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  }
};
