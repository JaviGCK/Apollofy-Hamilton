import { GenreType } from "../types/dataTypes/genre";
import { TopTrends } from "../types/dataTypes/topTrends";
import { UserType } from "../types/dataTypes/user";

export const fetchData = async (data: string): Promise<GenreType[] | UserType[] | TopTrends> => {
    const response = await fetch(`http://localhost:3001/${data}`);
    const dataFetched = await response.json();
    return dataFetched;
}
