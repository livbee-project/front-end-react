export type ChatRole = 'brand' | 'showhost' | 'admin';

export interface ChatUserInfo {
  id: string;
  name?: string;
  nickname?: string;
  role: ChatRole;
  avatarUrl?: string;
}

export interface ChatCampaignInfo {
  id: string;
  title: string;
  brandName?: string;
}

export interface ChatRoomSummary {
  roomId: string;
  campaign?: ChatCampaignInfo | null;
  brandUser?: ChatUserInfo | null;
  showhostUser?: ChatUserInfo | null;
  updatedAt: string;
  unreadCount: number;
  status?: 'active' | 'archived';
  lastMessage?: ChatMessage | null;
  me: {
    userId: string;
    role: ChatRole;
    lastReadMessageId?: string | null;
    lastReadAt?: string | null;
  };
  counterpart?: {
    userId: string;
    role: ChatRole;
    lastReadMessageId?: string | null;
    lastReadAt?: string | null;
  };
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  messageType: 'text' | 'file' | 'system';
  content: string;
  metadata?: Record<string, unknown> | null;
  status?: 'sent' | 'delivered' | 'read';
  createdAt: string;
  sender?: ChatUserInfo;
}

export interface ChatRoomDetail {
  room: ChatRoomSummary;
  messages: ChatMessage[];
  pagination?: {
    hasMore: boolean;
    nextCursor?: string;
  };
}

export interface CreateChatRoomRequest {
  campaignId: string;
  showhostUserId: string;
  brandUserId?: string;
}

export interface CreateChatRoomResponse {
  roomId: string;
}

export interface SendChatMessageRequest {
  content: string;
  messageType?: 'text' | 'file' | 'system';
  metadata?: Record<string, unknown> | null;
}

export interface SendChatMessageResponse {
  message: ChatMessage;
}

export interface ReadChatMessageRequest {
  lastMessageId: string;
}


