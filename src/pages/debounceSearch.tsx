import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
// import debounce from "../utils/debounce";
import { searchUsers } from "../services/searchService";
import type { User } from "../types/user";
import useDebounce from "../hooks/useDebounce";

const DebounceSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedQuery.trim()) {
        setUsers([]);
        return;
      }

      try {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        const controller = new AbortController();

        controllerRef.current = controller;

        setLoading(true);

        const results = await searchUsers(
          debouncedQuery,
          controller.signal
        );

        setUsers(results);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(e.target.value);
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