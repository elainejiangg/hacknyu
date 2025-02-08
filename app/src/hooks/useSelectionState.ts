"use client";

import { useState } from "react";

export interface Selection {
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
  index?: number;
  content?: string;
}

export function useSelectionState() {
  const [selectedElements, setSelectedElements] = useState<Selection[]>([]);

  const handleSelect = (selection: Selection) => {
    setSelectedElements((prev) => {
      const isAlreadySelected = prev.some(
        (el) => el.type === selection.type && el.index === selection.index
      );

      if (isAlreadySelected) {
        return prev.filter(
          (el) => !(el.type === selection.type && el.index === selection.index)
        );
      } else {
        return [...prev, selection];
      }
    });
  };

  const isSelected = (type: Selection["type"], index: number) => {
    return selectedElements.some(
      (element) => element.type === type && element.index === index
    );
  };

  return {
    selectedElements,
    handleSelect,
    isSelected,
  };
}
