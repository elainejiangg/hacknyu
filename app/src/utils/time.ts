export function generateTimestamp(isEmail: boolean = false): string {
  // Use a fixed date for SSR consistency
  const date = new Date("2025-02-08T16:16:00Z"); // Added Z for UTC

  if (isEmail) {
    return "Feb 8, 2025, 4:16 PM"; // Hardcoded format
  }

  return "Today 4:16 PM"; // Hardcoded format
}
