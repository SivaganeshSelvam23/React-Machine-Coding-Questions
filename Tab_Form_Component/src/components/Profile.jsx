import React from "react";

const Profile = ({ data, setData, errors }) => {
  const { name, age, email } = data;
  console.log("errors:", errors);
  const handleChange = (e, item) => {
    setData({ ...data, [item]: e.target.value });
  };
  return (
    <div className="text-white">
      <div className="py-4">
        <p className="italic">Profile Component</p>
      </div>
      <div className=" flex flex-col gap-2">
        <label>Name : </label>
        <input
          className="border-2 border-white rounded-md pl-1"
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleChange(e, "name")}
        />
        {errors.name && (
          <span className="text-red-600 text-sm">{errors.name}</span>
        )}
        <label>Email : </label>
        <input
          className="border-2 border-white rounded-md pl-1"
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleChange(e, "email")}
        />
        {errors.email && (
          <span className="text-red-600 text-sm">{errors.email}</span>
        )}
        <label>Age : </label>
        <input
          className="border-2 border-white rounded-md pl-1"
          type="number"
          name="age"
          value={age}
          onChange={(e) => handleChange(e, "age")}
        />
        {errors.age && (
          <span className="text-red-600 text-sm">{errors.age}</span>
        )}
      </div>
    </div>
  );
};

export default Profile;
