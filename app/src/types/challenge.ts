export interface ChallengeContent {
  type:
    | "greeting"
    | "body"
    | "link"
    | "warning"
    | "signature"
    | "sender"
    | "message"
    | "title"
    | "input"
    | "button"
    | "footer";
  content: string;
}

export interface BaseChallengeData {
  title: string;
  description: string;
  contentParts: ChallengeContent[];
  hints: string[];
}

export interface WebsiteChallengeData extends BaseChallengeData {
  url: string;
  contentParts: {
    type: "title" | "input" | "button" | "footer";
    content: string;
  }[];
}

export interface SMSChallengeData extends BaseChallengeData {
  sender: string;
  timestamp: string;
}

export interface EmailChallengeData extends BaseChallengeData {
  sender: string;
  subject: string;
  timestamp: string;
}

export type Selection = {
  type:
    | "title"
    | "input"
    | "button"
    | "footer"
    | "link"
    | "greeting"
    | "body"
    | "warning"
    | "signature"
    | "sender"
    | "message"
    | "subject"
    | "attachment";
  index: number;
};
