import React from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomButton from "./CustomButton";
import { popularSearch } from "../utils/data";

const SearchInput = ({ placeholder, icon, styles, value, setValue }) => {
  const handleChange = (e) => setValue(e.target.value);
  const clearInput = () => setValue("");
  return (
    <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
      {icon}
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type="text"
        className="w-full md:w-64 p-2 outline-none bg-transparent text-base"
        placeholder={placeholder}
      />
      <AiOutlineClose
        className="hidden md:flex text-gray-600 text-xl cursor-pointer"
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div className="bg-[#f7fdfd] text-customBlue">
      
      <div
        className={`container mx-auto px-5 ${
          type ? "h-[500px]" : "h-[350px]"
        } flex items-center relative`}
      >
        <div className="w-full z-10 text-customBlue">
          <div className="mb-8">
            <p className="font-bold text-4xl text-customBlue md:px-10 ">{title}</p>
          </div>
          <div className="w-full flex items-center justify-center bg-white bg-[#CDCDCD] pz-2 md:px-5 py-2.5 md:py-6  rounded-full">
            <SearchInput
              placeholder="Job Title or Keywords"
              icon={<AiOutlineSearch />}
              className="text-gray-600 text-xl"
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <SearchInput
              placeholder="Add Country or City"
              icon={<CiLocationOn />}
              className="text-gray-600 text-xl"
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            />
            <div>
              <CustomButton
                onClick={handleClick}
                title="Search"
                containerStyles={
                  "text-white py-2 md:py-3 px-3 md:px-10 focus:outline-none bg-[#1B7593] rounded-full md:rounded-md text-small md:text-base"
                }
              />
            </div>
          </div>
          {type && (
            <div className="w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 py-10 md:py-14">
              {popularSearch.map((search, index) => {
                return (
                  <span
                    key={index}
                    className="bg-[#1d4fd826] text-[#1d4ed8] py-1 px-2 rounded-full text-sm md:text-base"
                  >
                    {search}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
