import { MealSlotEntry } from "./meals";

export enum ChatRole {
  User = "user",
  Assistant = "assistant",
  System = "system", // optional: für Systemprompts / Hinweise
}

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
  attachments?: MealSlotEntry[];
}

/** Union aller Chat-Nachrichten */
export type ChatMessage = TextMessage | AiMessage;

export type AiResponse = {
  answerText: string; // natürlichsprachige Rückmeldung der KI
  entries: MealSlotEntry[]; // strukturierte Daten
  totals: {
    // aggregierte Tageswerte (optional, aber nützlich)
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };
};
