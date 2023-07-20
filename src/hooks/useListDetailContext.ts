import { useContext } from "react";
import { listDetailContext } from "../context/ListDetailContextProvider";

export const useListDetailContext = () => useContext(listDetailContext);