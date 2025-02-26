import React, { useState } from "react";
import { UserMangementImg } from "../../Assets";
import DoughnutChart from "../../Common/DoughnutChart";
import CourseProgress from "../../Common/CourseProgress";
import { tableData } from "../../Utils/tableData";
import TableComponent from "./TableComponent";

const UserManagement = () => {
  const [profileImage, setProfileImage] = useState(UserMangementImg);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <>
      <div className="text-xl flex-wrap font-semibold mb-5">User Details</div>
      <div className="flex gap-2">
        <div className="flex flex-wrap w-2/4 bg-white rounded-lg p-4 border gap-2 shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profilePicUpload"
            />
            <label htmlFor="profilePicUpload" className="cursor-pointer">
              <img
                className="h-56 w-56 rounded-full border-2 border-gray-300 hover:opacity-80"
                src={profileImage}
                alt="UserProfilePic"
              />
            </label>
          </div>

          <div className="p-2">
            <div className="flex">
              <div>
                <p className="font-semibold text-[16px] mb-2 ">
                  Peter Laningrad
                </p>
                <p className="text-sm font-extralight text-neutral-700">
                  Employee
                </p>
              </div>
              <div className="p-2 relative top-2 left-7">
                <span className="btn-active">Active</span>
              </div>
            </div>

            <div>
              <div className="mt-5">
                <p className="text-sm font-semibold">Email</p>
                <div className="text-sm gap-4 text-neutral-500 flex justify-between">
                  <span>peter.leningrad@gmail.com</span>
                  <p className="text-xs text-green-500 underline cursor-pointer">
                    update
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm font-semibold">Username</p>
                <div className="text-sm flex gap-4 text-neutral-500">
                  <p>PeterL</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm font-semibold">Password</p>
                <div className="text-sm gap-4 text-neutral-500 flex justify-between">
                  <span>**************</span>
                  <p className="text-xs text-green-500 underline cursor-pointer">
                    change
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 bg-white rounded-lg p-4 border shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
          <p className="font-semibold">Course & Training Progress</p>
          <div className="flex">
            <div className="w-1/3 pt-4">
              <DoughnutChart />
            </div>

            <div className="w-full ml-2 relative text-center top-8">
              <CourseProgress />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 h-auto rounded-lg bg-white shadow-[1px_2px_12px_0px_rgba(0,0,0,0.08)]">
        <div className="p-6">
          <p className="font-semibold text-lg">Performance & Achievements</p>

          <div className="flex mt-6 gap-4">
            <div className="p-4 shadow-md">
              <div className="text-green-500 text-2xl font-semibold">
                92.45%
              </div>
              <div className="">Avg. score achieved per module</div>
            </div>
            <div className="p-4 shadow-md">
              <div className="text-green-500 text-2xl font-semibold">
                6hr 28min
              </div>
              <div className="">Avg. time taken to complete per course</div>
            </div>
            <div className="p-4 shadow-md">
              <div className="text-green-500 text-2xl font-semibold">07</div>
              <div className="">Avg. number attempts per module</div>
            </div>
          </div>

          <div>
            <TableComponent data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;


// https://www.youtube.com/watch?v=odscV57kToU