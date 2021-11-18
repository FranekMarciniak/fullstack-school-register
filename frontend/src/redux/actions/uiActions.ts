import { SET_SECTION } from "./types";
export const setSection = (section: string) => {
  return { type: SET_SECTION, section };
};
