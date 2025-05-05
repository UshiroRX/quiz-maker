import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SearchWithDebounce = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    if (debouncedSearch) {
      console.log("Значение для отправки на API:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <TextField
      label="Поиск квиза"
      variant="outlined"
      fullWidth
      value={search}
      onChange={handleSearchChange}
      sx={{
        "& .MuiInputLabel-root": {},
      }}
    />
  );
};

export default SearchWithDebounce;
