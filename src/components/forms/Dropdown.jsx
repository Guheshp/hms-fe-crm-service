import { Search } from "@mui/icons-material";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";

const Dropdown = ({
  label,
  required = false,
  options = [],
  value,
  onChange,
  valueKey = "id",
  labelKey = "label",
  placeholder = "Select...",
  disabled = false,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const buttonRef = useRef(null);

  const filteredOptions = useMemo(() => {
    return options?.filter((item) =>
      String(item[labelKey]).toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search, labelKey]);

  const selectedOption = useMemo(() => {
    return options?.find((item) => item[valueKey] === value);
  }, [options, value, valueKey]);

  const handleSelect = (item) => {
    onChange(item[valueKey]);
    setSearch("");
    setOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      if (!open) {
        const rect = buttonRef.current.getBoundingClientRect();

        setPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });

        setSearch("");
      }

      setOpen(!open);
    }
  };

  return (
    <>
      <FormControl
        fullWidth
        error={!!error}
        sx={{
          m: 0,
        }}
      >
        <div className="w-full">
          {label && (
            <InputLabel
              shrink
              htmlFor={name}
              sx={{
                position: "static",
                transform: "none",
                mb: 1,
                fontWeight: 400,
                fontSize: "0.95rem",
                color: "#334155",

                "& .required": {
                  color: "#ef4444",
                },
              }}
            >
              {label}
              {required && <span className="required"> *</span>}
            </InputLabel>
          )}

          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              disabled={disabled}
              onClick={toggleDropdown}
              className={`w-full rounded-lg border bg-white px-3 py-[13px] pr-10 text-left transition-colors
${
  error
    ? "border-red-500"
    : "border-gray-300 hover:border-blue-600 focus:border-blue-600"
}
${disabled ? "cursor-not-allowed bg-slate-50" : ""}
`}
            >
              {selectedOption ? selectedOption[labelKey] : placeholder}
            </button>

            {/* Clear Button */}
            {selectedOption && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  setSearch("");
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            )}

            {/* Dropdown Arrow */}
            <button
              type="button"
              onClick={toggleDropdown}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <svg
                className={`h-4 w-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <ul
            className="fixed z-[99999] max-h-72 overflow-hidden rounded-md border bg-white shadow-lg"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            {/* Search */}
            <div className="border-b p-2">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Options */}
            <div className="max-h-56 overflow-y-auto">
              {filteredOptions?.length === 0 ? (
                <div className="px-3 py-3 text-center text-gray-500">
                  No data found
                </div>
              ) : (
                filteredOptions?.map((item) => (
                  <div
                    key={item[valueKey]}
                    onClick={() => handleSelect(item)}
                    className={`cursor-pointer px-3 py-2 hover:bg-blue-50 ${
                      value === item[valueKey] ? "bg-blue-100 font-medium" : ""
                    }`}
                  >
                    {item[labelKey]}
                  </div>
                ))
              )}
            </div>
          </ul>
        )}
        <FormHelperText
          sx={{
            minHeight: 22,
            ml: 0,
            mt: 0.8,
          }}
        >
          {error?.message || " "}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default Dropdown;
