"use client";

import { useState } from "react";

export interface Selection {
  type: "sender" | "message";
  index?: number;
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

  const isSelected = (type: string, index?: number) =>
    selectedElements.some((el) => el.type === type && el.index === index);

  return {
    selectedElements,
    handleSelect,
    isSelected,
  };
}
