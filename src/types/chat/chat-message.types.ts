import type {UserChatMessage} from "./user-chat-message.types.ts";
import type {AssistantChatMessage} from "./assistant-chat-message.types.ts";


export type ChatMessage = UserChatMessage | AssistantChatMessage