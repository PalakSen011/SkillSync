import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
// import styles from "./PDFStyles";
import { UserMangementImg } from "../../../Assets";
import { userData } from "../../../Utils/userData";
// import UserDetailsPDFSection from "./UserDetailsPDFSection";
// import CoursesPDFSection from "./CoursesPDFSection";
// import PerformanceHighlightsTable from "./PerformanceHighlightsTable";
// import PDFFooter from "./PDFFooter";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  section: {
    margin: 5,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  // User information styling - full width
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 0,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    overflow: "hidden",
    marginRight: 20,
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  userDetails: {
    flex: 1,
  },
  // Chart image styling
  chartContainer: {
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
  },
  chartImage: {
    width: "100%", // Changed to 100% for full width
  },
  // Performance card styling
  performanceSection: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
  },
  performanceItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingVertical: 6,
    marginBottom: 3,
  },
  performanceLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
  },
  performanceValue: {
    flex: 1,
    fontSize: 11,
    textAlign: "right",
  },
  // Table styling - reduced size
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0.5,
    marginTop: 15,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 4,
    backgroundColor: "#F2F2F2",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 4,
    fontSize: 9,
  },
  subRow: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
  },
  subCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 3,
    fontSize: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 11,
    marginBottom: 4,
  },
  courseProgressSection: {
    marginVertical: 10,
  },
  courseProgressItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  courseProgressName: {
    flex: 2,
    fontSize: 11,
  },
  courseProgressValue: {
    flex: 1,
    fontSize: 11,
  },
});
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
              Name: {userData?.userInfo?.name || "N/A"}
            </Text>
            <Text style={styles.content}>
              Email: {userData?.userInfo?.email || "N/A"}
            </Text>
            <Text style={styles.content}>
              ID: {userData?.userInfo?.username || "N/A"}
            </Text>
            <Text style={styles.content}>
              Status: {userData?.userInfo?.status || "N/A"}
            </Text>
          </View>
        </View>
        {/* Chart Image - Full Width */}
        <View style={styles.chartContainer}>
          <Image src={chartImage} style={styles.chartImage} />
        </View>
        {/* Course Progress Section */}
        <View style={styles.courseProgressSection}>
          <Text style={styles.subtitle}>Course Progress</Text>
          {userData?.courseProgress?.map((course, index) => (
            <View key={index} style={styles.courseProgressItem}>
              <Text style={styles.courseProgressName}>{course.name}:</Text>
              <Text style={styles.courseProgressValue}>
                {course.progress}% completed
              </Text>
            </View>
          ))}
        </View>
        {/* Performance Section with Vertical Alignment, Border and Shadow */}
        <View style={styles.performanceSection}>
          <Text style={styles.subtitle}>Performance</Text>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Average Score:</Text>
            <Text style={styles.performanceValue}>
              {userData?.performance?.averageScore || "N/A"}
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Highest Score:</Text>
            <Text style={styles.performanceValue}>
              {userData?.performance?.highestScore || "N/A"}
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Completion Rate:</Text>
            <Text style={styles.performanceValue}>
              {userData?.performance?.completionRate || "N/A"}
            </Text>
          </View>
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
