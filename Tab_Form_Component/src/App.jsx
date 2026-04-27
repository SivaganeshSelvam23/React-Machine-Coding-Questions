import React, { useState } from "react";
import Profile from "./components/Profile";
import Interests from "./components/Interests";
import Settings from "./components/Settings";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState({
    name: "siva",
    age: 29,
    email: "siva@gmail.com",
    interests: ["Cricket", "Music", "Coding"],
    theme: "Dark",
  });
  const [errors, setErrors] = useState({});
  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!userData.name || userData.name.length < 2) {
          err.name = "Name is not valid.";
        }
        if (!userData.age || userData.age < 18) {
          err.age = "Age is not valid.";
        }
        if (!userData.email || userData.email.length < 2) {
          err.email = "Email is not valid.";
        }
        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
        if (userData.interests.length < 1) {
          err.interests = "Select atleast one interest";
        }
        setErrors(err);
        return err.interests ? false : true;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => {
        return true;
      },
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  return (
    <div className="bg-black h-screen roboto">
      <span className="text-sky-600 flex justify-center text-2xl p-10 ">
        Tab-Forms Machine Coding Question
      </span>
      <div className="mx-5 flex">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className="text-white border border-sky-500 p-3 cursor-pointer"
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="text-white mx-5 p-5 border flex justify-center items-center border-sky-500 max-w-full h-125">
        <ActiveTabComponent
          data={userData}
          setData={setUserData}
          errors={errors}
        />
      </div>

      <div className="flex justify-end text-white mx-5 mt-5 gap-5">
        {activeTab > 0 && (
          <GrFormPrevious
            className=" text-4xl text-blue-200"
            onClick={() =>
              tabs[activeTab].validate() && setActiveTab(activeTab - 1)
            }
          />
        )}
        {activeTab == tabs.length - 1 && (
          <span
            className="p-3 bg-blue-600 rounded-md cursor-pointer hover:bg-blue-800"
            onClick={() => console.log(userData)}
          >
            Submit
          </span>
        )}
        {activeTab != tabs.length - 1 && (
          <GrFormNext
            className=" text-4xl text-blue-200"
            onClick={() =>
              tabs[activeTab].validate() && setActiveTab(activeTab + 1)
            }
          />
        )}
      </div>
    </div>
  );
};

export default App;
