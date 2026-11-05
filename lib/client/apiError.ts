import axios from "axios";

// Pulls the server's { error } message out of a failed axios request.
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error;
    if (typeof message === "string" && message.length > 0) return message;
  }
  return fallback;
}
