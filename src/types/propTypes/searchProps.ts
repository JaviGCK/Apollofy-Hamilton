export interface SearchProps {
    focus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>
    searchInput: string;
    customFilter?: boolean;
    setSearchInput:React.Dispatch<React.SetStateAction<string>>
}
