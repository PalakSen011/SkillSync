import React, { lazy, Suspense } from "react";

const DoughnutChart = lazy(() => import("../../Common/DoughnutChart"));
const CourseProgress = lazy(() => import("../../Common/CourseProgress"));

const ChartLoader = () => (
  <div className="w-full md:w-1/3 pt-4 h-40 bg-gray-100 animate-pulse rounded-md"></div>
);

const ProgressLoader = () => (
  <div className="w-full ml-0 md:ml-2 relative text-center top-8 h-32 bg-gray-100 animate-pulse rounded-md"></div>
);

const CourseTrainingProgress = ({ chartRef }) => {
  return (
    <div className="w-full md:w-3/5 bg-white rounded-lg p-4 border shadow-md mt-4 md:mt-0">
      <p className="font-semibold">Course & Training Progress</p>
      <div ref={chartRef} className="flex flex-col md:flex-row mt-2">
        <Suspense fallback={<ChartLoader />}>
          <div className="w-full md:w-1/2 flex justify-center">
            <DoughnutChart />
          </div>
        </Suspense>
        <Suspense fallback={<ProgressLoader />}>
          <div className="w-full ml-0 md:ml-2 relative text-center top-8">
            <CourseProgress />
          </div>
        </Suspense>
      </div>
    </div>

    
  );
};

export default CourseTrainingProgress;
