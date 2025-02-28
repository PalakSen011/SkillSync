// UserProfileCard.js
import React, { useState } from "react";
import { UserMangementImg } from "../../Assets";
import ImageUploader from "./ImageUploder";

const UserProfileCard = () => {
  const [profileImage, setProfileImage] = useState(UserMangementImg);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfileImage(imageUrl);
  //   }
  // };

  return (
    <div className="flex  w-full md:w-2/5 bg-white rounded-lg p-4 border gap-2 shadow-md">
      <div className="relative mx-auto md:mx-0">
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="profilePicUpload"
        /> */}
        {/* <label htmlFor="profilePicUpload" className="cursor-pointer block">
          <img
            className="h-40 w-40 md:h-56 md:w-56 rounded-full border-2 border-gray-300 hover:opacity-80 transition-opacity"
            src={profileImage}
            alt="UserProfilePic"
          />
        </label> */}
        <div className="h-40 w-40 md:h-56 md:w-56 rounded-full border-2 border-gray-300 hover:opacity-80 transition-opacity">
          <ImageUploader/>
        </div>
      </div>
      <div className="p-2 flex-1">
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="font-semibold text-[16px] mb-2">Peter Laningrad</p>
            <p className="text-sm font-extralight text-neutral-700">Employee</p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Active
            </span>
          </div>
        </div>

        <ProfileInfoItem
          label="Email"
          value="peter.leningrad@gmail.com"
          actionLabel="update"
        />

        <ProfileInfoItem label="Username" value="PeterL" />

        <ProfileInfoItem
          label="Password"
          value="**************"
          actionLabel="change"
        />
      </div>
    </div>
  );
};

const ProfileInfoItem = ({ label, value, actionLabel }) => {
  return (
    <div className="mt-5">
      <p className="text-sm font-semibold">{label}</p>
      <div className="text-sm gap-4 text-neutral-500 flex justify-between">
        <span>{value}</span>
        {actionLabel && (
          <button className="text-xs text-green-500 underline">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
