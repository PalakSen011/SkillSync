import React from "react";

import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "./PDFStyles";
import { UserMangementImg } from "../../../Assets";

// Create PDF Document component
const ReportDocument = ({ userData, chartImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>User Report</Text>
        {/* User Info Section - Full Width */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            <Image src={UserMangementImg} style={styles.userImage} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.subtitle}>User Informations</Text>
            <Text style={styles.content}>
              Name:{" "}
              {userData?.user
                ? `${userData.user.firstName} ${userData.user.lastName}`
                : "N/A"}
            </Text>
            <Text style={styles.content}>
              Email: {userData?.user?.email || "N/A"}
            </Text>
            <Text style={styles.content}>
              ID: {userData?.user?.employeeId || "N/A"}
            </Text>
            <Text style={styles.content}>
              User Name: {userData?.user?.username || "N/A"}
            </Text>
            <Text style={styles.content}>
              Department: {userData?.user?.department || "N/A"}
            </Text>
          </View>
        </View>

          <Text style={styles.subtitle}>Performance & Activities</Text>
        {/* Performance Section with Vertical Alignment, Border and Shadow */}
        <View style={styles.performanceSection}> 
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Average Score:</Text>
            <Text style={styles.performanceValue}>
              {userData?.avgScore || "N/A"}
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Average Time:</Text>
            <Text style={styles.performanceValue}>
              {userData?.avgTime || "N/A"}
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Average Attempts:</Text>
            <Text style={styles.performanceValue}>
              {userData?.avgAttempts || "N/A"}
            </Text>
          </View>
        </View>

        {/* Chart Image - Full Width */}
        <View style={styles.chartContainer}>
          <Image src={chartImage} style={styles.chartImage} />
        </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      {/* Table with Reduced Size */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Course</Text>
          <Text style={styles.tableCellHeader}>Score</Text>
          <Text style={styles.tableCellHeader}>Time</Text>
          <Text style={styles.tableCellHeader}>Attempts</Text>
          <Text style={styles.tableCellHeader}>Assigned</Text>
          <Text style={styles.tableCellHeader}>Completed</Text>
          <Text style={styles.tableCellHeader}>Status</Text>
        </View>
        {/* Table Rows with Sub-rows */}
        {userData.courses.map((data, index) => (
          <React.Fragment key={index}>
            {/* Parent Row */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{data.course}</Text>
              <Text style={styles.tableCell}>{data.scoreAchieved}</Text>
              <Text style={styles.tableCell}>{data.timeTaken}</Text>
              <Text style={styles.tableCell}>{data.noOfAttempts}</Text>
              <Text style={styles.tableCell}>{data.assignedDate}</Text>
              <Text style={styles.tableCell}>{data.completedDate}</Text>
              <Text style={styles.tableCell}>{data.taskStatus}</Text>
            </View>
            {/* Sub-rows */}
            {data.subCourses?.map((subCourse, subIndex) => (
              <View style={styles.subRow} key={subIndex}>
                <Text style={styles.subCell}>{subCourse.course}</Text>
                <Text style={styles.subCell}>{subCourse.scoreAchieved}</Text>
                <Text style={styles.subCell}>{subCourse.timeTaken}</Text>
                <Text style={styles.subCell}>{subCourse.noOfAttempts}</Text>
                <Text style={styles.subCell}>{subCourse.assignedDate}</Text>
                <Text style={styles.subCell}>{subCourse.completedDate}</Text>
                <Text style={styles.subCell}>{subCourse.taskStatus}</Text>
              </View>
            ))}
          </React.Fragment>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportDocument;
