import { useContext } from "react";
import { selectedUserContext } from "../../context/SelectedUserContextProvider";


export const useSelectedUserContext = () => useContext(selectedUserContext);