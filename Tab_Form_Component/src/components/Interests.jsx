import React from "react";

const Interests = ({ data, setData, errors }) => {
  const { interests } = data;
  const handleChange = (e) => {
    setData({
      ...data,
      interests: e.target.checked
        ? [...data.interests, e.target.name]
        : data.interests.filter((i) => i !== e.target.name),
    });
  };
  return (
    <div className="text-white">
      <div className="py-4">
        <p className="italic">Interests Component</p>
      </div>
      <div className="flex gap-5 items-baseline">
        <label>
          <input
            type="checkbox"
            name="Cricket"
            checked={interests.includes("Cricket")}
            onChange={handleChange}
          />
          <span className="ml-1">Cricket</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="Coding"
            checked={interests.includes("Coding")}
            onChange={handleChange}
          />
          <span className="ml-1">Coding</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="Music"
            checked={interests.includes("Music")}
            onChange={handleChange}
          />
          <span className="ml-1">Music</span>
        </label>
        {errors.interests && (
          <span className="text-red-600 text-sm">{errors.interests}</span>
        )}
      </div>
    </div>
  );
};

export default Interests;
