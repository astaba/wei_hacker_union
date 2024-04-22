import { Story } from "../types/constants";
import { initialList } from "../constants/mock_data";

export const getMockAsyncData = (
  on: boolean,
): Promise<{ data: { stories: Story[] } }> => {
  return new Promise((resolve, reject) => {
    if (on) {
      setTimeout(() => resolve({ data: { stories: initialList } }), 2000);
      return;
    }
    setTimeout(() => reject(new Error("Rejected promise.")), 2000);
  });
};
