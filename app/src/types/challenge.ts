export type Selection = {
  type:
    | "subject"
    | "sender"
    | "body"
    | "attachment"
    | "title"
    | "input"
    | "button"
    | "footer"
    | "message"
    | "url";
  index: number;
};
