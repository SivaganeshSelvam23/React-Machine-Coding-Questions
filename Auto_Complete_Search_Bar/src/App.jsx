import React, { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

const App = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [cache, setCache] = useState({});

  const itemRefs = useRef([]);

  const fetchData = async () => {
    if (!input.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }
    if (cache[input]) {
      console.log("Cache returned ", cache);
      setResults(cache[input]);
      return;
    }

    console.log("Api Call : ", input);
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input,
    );
    const data = await response.json();
    setResults(data?.recipes || []);
    setCache((prev) => ({ ...prev, [input]: data?.recipes }));
    setSelectedIndex(-1);
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      setInput(results[selectedIndex].name);
      setShowResults(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center pt-20">
      <p className="text-2xl text-white mb-8">
        Auto Complete Search Bar Component.
      </p>

      <div className="w-225 relative">
        <div
          className={`bg-white overflow-hidden ${
            showResults && results.length > 0
              ? "rounded-[30px]"
              : "rounded-full"
          }`}
        >
          <div className="relative">
            <LuSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-14 pr-6 py-2 text-lg text-black bg-white outline-none"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {showResults && results.length > 0 && (
            <div className="px-4 pb-4 max-h-100 overflow-y-auto">
              {results.map((r, index) => (
                <div
                  key={r.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`px-4 py-3 text-black text-xl rounded-xl cursor-pointer ${
                    selectedIndex === index
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setInput(r.name);
                    setShowResults(false);
                    setSelectedIndex(-1);
                  }}
                >
                  {r.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
