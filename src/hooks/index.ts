import { useContext } from "react";
import { GlobalContext } from "GlobalProvider";

export const useGlobalProvider = () => {
  return useContext(GlobalContext);
};
