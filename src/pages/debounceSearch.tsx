import { useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import debounce from "../utils/debounce";
import { searchUsers } from "../services/searchService";
import type { User } from "../types/user";

const DebounceSearch = () => {
  console.log("Component Re-rendered");

  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const controllerRef = useRef<AbortController | null>(null);

  const debouncedSearch = useMemo(() => {
    return debounce(async (value: string) => {
      try {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        const controller = new AbortController();

        controllerRef.current = controller;

        setLoading(true);

        const results = await searchUsers(
          value,
          controller.signal
        );

        setUsers(results);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Previous request aborted");
          } else {
            console.log(error.message);
          }
        }
      } finally {
        setLoading(false);
      }
    }, 500);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    debouncedSearch(value);
  };

  return (
    <div className="debounce-page">
      <h1>Debounce Search</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={handleChange}
      />

      {loading && <p>Loading...</p>}

      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebounceSearch;