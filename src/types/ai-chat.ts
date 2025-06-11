import { FoodItem, Recipe } from "./meals";

export enum ChatRole {
  User = "user",
  Assistant = "assistant",
  System = "system", // optional: für Systemprompts / Hinweise
}
export type ChatAttachment =
  | { type: "foodItem"; data: FoodItem }
  | { type: "recipe"; data: Recipe };

export interface BaseMessage {
  /** UUID oder Snowflake */
  id: string;
  /** FK auf Chat */
  chatId: string;
  /** Verfasser */
  role: ChatRole;
  /** ISO-String in UTC */
  createdAt: string;
}

/** Reine Textnachricht (User oder System) */
export interface TextMessage extends BaseMessage {
  type: "text";
  content: string;
}

/** KI-Nachricht – kann Food/Recipe-Daten enthalten */
export interface AiMessage extends BaseMessage {
  type: "assistant";
  /** Vom Modell generierter Text (Markdown möglich) */
  content: string;
  /** Strukturierte Vorschläge der KI */
  attachments?: ChatAttachment[];
}

/** Union aller Chat-Nachrichten */
export type ChatMessage = TextMessage | AiMessage;
