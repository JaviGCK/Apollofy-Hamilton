import { useContext } from "react";
import { searchDataContext } from "../../context/SearchDataContextProvider";

export const useSearchDataContext = () => useContext(searchDataContext);