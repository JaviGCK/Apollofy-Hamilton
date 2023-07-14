export const fetchGenres = async () => {
    const response = await fetch('http://localhost:3000/genres');
    const data = await response.json();
    return data;
}
export const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    return data;
}
