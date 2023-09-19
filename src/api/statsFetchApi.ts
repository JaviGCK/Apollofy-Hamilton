export const fetchStats = async (userId: string) => {
    const { VITE_API_STATS_URL: url } = import.meta.env;
    const response = await fetch(`${url}${userId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },

    })
    const data = await response.json()
    return data;
}

export const updateUserStats = async (userId: string, endpoint: string, content?: string | number) => {
    const { VITE_API_STATS_URL: url } = import.meta.env;
    const response = await fetch(`${url}${endpoint}/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(content)

    })
    const data = await response.json()
    return data;
}
