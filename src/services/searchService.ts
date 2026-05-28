export const searchUsers = async (
  query: string,
  signal: AbortSignal
) => {
  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {
      signal,
    }
  );

  const data = await response.json();

  const filteredUsers = data.filter((user: { name: string }) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return filteredUsers;
};