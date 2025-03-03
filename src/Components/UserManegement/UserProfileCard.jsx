import React, { useState } from "react";
import { UserMangementImg } from "../../Assets";
import ImageUploader from "./ImageUploder";
import { userData } from "../../Utils/userData";

const UserProfileCard = () => {
  const { email, username, firstName, lastName, department } = userData.user;
  const [profileImage, setProfileImage] = useState(UserMangementImg);

  return (
    <div className="flex w-full md:w-2/5 bg-white rounded-lg p-4 border gap-2 shadow-md">
      <div className="relative mx-auto md:mx-0">
        <div className="h-40 w-40 md:h-56 md:w-56 rounded-full border-2 border-gray-300 hover:opacity-80 transition-opacity">
          <ImageUploader />
        </div>
      </div>
      <div className="p-2 flex-1">
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="font-semibold text-[16px] mb-2">{`${firstName} ${lastName}`}</p>
            <p className="text-sm font-extralight text-neutral-700">
              {department}
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Active
            </span>
          </div>
        </div>

        <ProfileInfoItem label="Email" value={email} actionLabel="update" />

        <ProfileInfoItem label="Username" value={username} />

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
