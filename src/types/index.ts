export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ApiResponse {
  response: string;
}

export interface ApiError {
  error: string;
}