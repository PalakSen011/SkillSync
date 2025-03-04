// PerformanceAchievements.js
import React, { lazy, Suspense } from "react";
import { userData } from "../../Utils/userData";

const TableComponent = lazy(() => import("./TableComponent"));

const TableLoader = () => (
  <div className="w-full h-64 bg-gray-100 animate-pulse rounded-md mt-4"></div>
);

const PerformanceAchievements = () => {
  return (
    <div className="mt-5 h-auto rounded-lg bg-white shadow-md">
      <div className="p-6">
        <p className="font-semibold text-lg">Performance & Achievements</p>
        <div className="flex mt-6 gap-4">
          <div className="p-4 shadow-md">
            <div className="text-green-500 text-2xl font-semibold">{userData?.avgScore}</div>
            <div className="">Avg. score achieved per module</div>
          </div>
          <div className="p-4 shadow-md">
            <div className="text-green-500 text-2xl font-semibold">
              {userData?.avgTime}
            </div>
            <div className="">Avg. time taken to complete per course</div>
          </div>
          <div className="p-4 shadow-md">
            <div className="text-green-500 text-2xl font-semibold">{userData.avgAttempts}</div>
            <div className="">Avg. number attempts per module</div>
          </div>
        </div>
        <Suspense fallback={<TableLoader />}>
          <TableComponent data={userData.courses} />
        </Suspense>
      </div>
    </div>
  );
};

export default PerformanceAchievements;
