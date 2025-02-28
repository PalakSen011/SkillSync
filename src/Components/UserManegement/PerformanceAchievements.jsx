// PerformanceAchievements.js
import React, { lazy, Suspense } from "react";
import { tableData } from "../../Utils/tableData";

const TableComponent = lazy(() => import("./TableComponent"));

const TableLoader = () => (
  <div className="w-full h-64 bg-gray-100 animate-pulse rounded-md mt-4"></div>
);

const PerformanceAchievements = () => {
  return (
    <div className="mt-5 h-auto rounded-lg bg-white shadow-md">
      <div className="p-6">
        <p className="font-semibold text-lg">Performance & Achievements</p>
        <Suspense fallback={<TableLoader />}>
          <TableComponent data={tableData} />
        </Suspense>
      </div>
    </div>
  );
};

export default PerformanceAchievements;
