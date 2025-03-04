import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import UserProfileCard from "./UserProfileCard";
import CourseTrainingProgress from "./CourseTrainingProgress";
import PerformanceAchievements from "./PerformanceAchievements";
import { userData } from "../../Utils/userData";
import { UserMangementImg } from "../../Assets"; 

const UserManagement = () => {
  const chartRef = useRef(null);
  const [chartImage, setChartImage] = useState("");
  const tableData = [];
  userData.courses.forEach((course) => {
    tableData.push([
      course.course,
      course.scoreAchieved,
      course.timeTaken,
      course.noOfAttempts,
      course.assignedDate,
      course.completedDate,
      course.taskStatus,
    ]);

    course.subCourses?.forEach((subCourse) => {
      tableData.push([
        `  - ${subCourse.course}`,
        subCourse.scoreAchieved,
        subCourse.timeTaken,
        subCourse.noOfAttempts,
        subCourse.assignedDate,
        subCourse.completedDate,
        subCourse.taskStatus,
      ]);
    });
  });
  const generatePDF = async () => {
    const doc = new jsPDF();

    // User image beside user information
    doc.addImage(UserMangementImg, "PNG", 10, 10, 40, 40);
    doc.setFontSize(16);
    doc.text("User Report", 60, 20);
    doc.setFontSize(12);
    doc.text(
      `Name: ${userData.user.firstName} ${userData.user.lastName}`,
      60,
      30
    );
    doc.text(`Email: ${userData.user.email}`, 60, 40);
    doc.text(`Employee ID: ${userData.user.employeeId}`, 60, 50);
    
    // Capture chart image
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      doc.setFontSize(16);
      doc.text("Training Progress", 10, 60);
      doc.addImage(imgData, "PNG", 10, 70, 180, 45);
    }

    // Prepare table data including subCourses
    autoTable(doc, {
      startY: 130,
      head: [
        [
          "Course",
          "Score",
          "Time",
          "Attempts",
          "Assigned",
          "Completed",
          "Status",
        ],
      ],
      body: tableData,
    });

    doc.save(
      `${userData.user.firstName}_${userData.user.lastName}_Training_Report.pdf`
    );
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Download PDF
        </button>
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
