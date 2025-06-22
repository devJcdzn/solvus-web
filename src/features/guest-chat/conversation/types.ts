export interface ChatResponseMessage {
  object: string;
  data: Daum[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

export interface Daum {
  id: string;
  object: string;
  created_at: number;
  assistant_id?: string;
  thread_id: string;
  run_id?: string;
  role: string;
  content: Content[];
  attachments: any[];
  metadata: Metadata;
}

export interface Content {
  type: string;
  text: Text;
}

export interface Text {
  value: string;
  annotations: any[];
}

export interface Metadata {}
