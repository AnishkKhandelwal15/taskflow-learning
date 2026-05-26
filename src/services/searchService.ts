export const searchUsers  = async (query: string) => {
    if (!query) {
        return [];
    }

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
    );
    const data = await response.json();
    return data;

    const filteredUsers = data.filter((user: { name: string }) =>
        user.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredUsers;
}