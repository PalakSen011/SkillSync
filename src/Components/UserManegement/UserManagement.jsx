// UserManagement.js - Main component
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import UserProfileCard from "./UserProfileCard";
import CourseTrainingProgress from "./CourseTrainingProgress";
import PerformanceAchievements from "./PerformanceAchievements";

const UserManagement = () => {
  const pdfRef = useRef();

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
    pdf.save("User_Details.pdf");
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>

      <div ref={pdfRef}>
        <div className="text-xl font-semibold mb-5">User Details</div>
        <div className="flex gap-2 flex-col md:flex-row">
          <UserProfileCard />
          <CourseTrainingProgress />
        </div>
        <PerformanceAchievements />
      </div>
    </>
  );
};

export default UserManagement;