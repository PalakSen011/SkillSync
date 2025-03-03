import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

import { PDFDownloadLink } from "@react-pdf/renderer";
import UserProfileCard from "./UserProfileCard";
import CourseTrainingProgress from "./CourseTrainingProgress";
import PerformanceAchievements from "./PerformanceAchievements";
import ReportDocument from "./PDFComponents/ReportDocument";
import { userData } from "../../Utils/userData";

const UserManagement = () => {
  // Sample user data (in a real app, this would come from props or API)
  const chartRef = useRef(null);
  const [chartImage, setChartImage] = useState("");
  const captureChart = async () => {
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current);
        setChartImage(canvas.toDataURL("image/png"));
      } catch (error) {
        console.error("Error capturing chart:", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <PDFDownloadLink
          document={
            <ReportDocument userData={userData} chartImage={chartImage} />
          }
          fileName={`${userData.user.firstName}_${userData.user.lastName}_Training_Report.pdf`}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={() => captureChart()}
        >
          {({ loading }) =>
            loading ? "Generating PDF..." : "Download Customized PDF"
          }
        </PDFDownloadLink>
      </div>

      {/* Regular content for display in the app */}
      <div className="p-5 border rounded-lg bg-white">
        <div className="text-xl font-semibold mb-5">User Details</div>
        <div className="flex gap-2 flex-col md:flex-row">
          <UserProfileCard />
          <CourseTrainingProgress chartRef={chartRef} />
        </div>
        <PerformanceAchievements />
      </div>
    </>
  );
};

export default UserManagement;
