import { useState } from "react";
import type { ChangeEvent } from "react";

const DebounceSearch = () => {
    console.log("Component Re-rendered");
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="debounce-page">
      <h1>Debounce Search</h1>

      <input
        type="text"
        placeholder="Search something..."
        value={query}
        onChange={handleChange}
      />

      <p>Current Query: {query}</p>
    </div>
  );
};

export default DebounceSearch;