import { useContext } from "react";
import { topTrendsContext } from "../../context/TopTrendsContextProvider";

export const useTopTrendsContext = () => useContext(topTrendsContext);