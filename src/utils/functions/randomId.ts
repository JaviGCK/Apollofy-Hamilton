

export const getUniqueId = (): string => {
    return Math.random().toString(36).slice(2);
}