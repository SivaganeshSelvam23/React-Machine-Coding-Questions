import React from "react";

const Settings = ({ data, setData }) => {
  const { theme } = data;
  const handleChange = (e) => {
    setData({ ...data, theme: e.target.name });
  };
  return (
    <div className="text-white">
      <div className="py-4">
        <p className="italic">Settings Component</p>
      </div>
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="Dark"
            checked={theme === "Dark"}
            onChange={handleChange}
          />
          <span className="ml-1">Dark</span>
        </label>
        <label>
          <input
            type="radio"
            name="Light"
            checked={theme === "Light"}
            onChange={handleChange}
          />
          <span className="ml-1">Light</span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
