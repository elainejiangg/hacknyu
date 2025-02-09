"use client";

import { useState } from "react";
import { Selection } from "@/types/challenge";

export function useSelectionState() {
  const [selectedElements, setSelectedElements] = useState<Selection[]>([]);

  const handleSelect = (selection: Selection) => {
    setSelectedElements((prev) => {
      const exists = prev.some(
        (el) => el.type === selection.type && el.index === selection.index
      );

      const newState = exists
        ? prev.filter(
            (el) =>
              !(el.type === selection.type && el.index === selection.index)
          )
        : [...prev, selection];

      console.log("Currently selected elements:", newState);
      return newState;
    });
  };

  const isSelected = (type: Selection["type"], index: number) => {
    return selectedElements.some(
      (el) => el.type === type && el.index === index
    );
  };

  return { selectedElements, handleSelect, isSelected };
}
