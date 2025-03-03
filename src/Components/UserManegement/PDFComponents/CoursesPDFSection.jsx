import React from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./PDFStyles";

const CoursesPDFSection = ({ certificationsData }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Completed Training Courses</Text>

    {/* Main courses table */}
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableHeader}>Course</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={styles.tableHeader}>Assigned Date</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={styles.tableHeader}>Completed Date</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={styles.tableHeader}>Time Taken</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableHeader}>Status</Text>
        </View>
      </View>

      {/* Table Data */}
      {certificationsData.map((course, index) => (
        <React.Fragment key={index}>
          {/* Main Course Row */}
          <View
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff" },
            ]}
          >
            <View style={[styles.tableCol, { width: "35%" }]}>
              <Text style={styles.tableCell}>{course.course}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableCell}>{course.assignedDate}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableCell}>{course.completedDate}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableCell}>{course.timeTaken}</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  {
                    color:
                      course.taskStatus === "Completed" ? "green" : "black",
                  },
                ]}
              >
                {course.taskStatus}
              </Text>
            </View>
          </View>
        </React.Fragment>
      ))}
    </View>

    {/* Subcourses table - displayed separately */}
    <Text style={[styles.subtitle, { fontSize: 16, marginTop: 20 }]}>
      Course Details
    </Text>
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "40%" }]}>
          <Text style={styles.tableHeader}>Module</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={styles.tableHeader}>Score</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={styles.tableHeader}>Time Taken</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={styles.tableHeader}>Attempts</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={styles.tableHeader}>Parent Course</Text>
        </View>
      </View>

      {/* All subcourses flattened into a single table */}
      {certificationsData.flatMap((course, courseIndex) =>
        course.subCourses.map((subCourse, subIndex) => (
          <View
            key={`${courseIndex}-${subIndex}`}
            style={[
              styles.tableRow,
              {
                backgroundColor:
                  (courseIndex + subIndex) % 2 === 0 ? "#f8f9fa" : "#ffffff",
              },
            ]}
          >
            <View style={[styles.tableCol, { width: "40%" }]}>
              <Text style={styles.tableCell}>{subCourse.course}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableCell}>{subCourse.scoreAchieved}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableCell}>{subCourse.timeTaken}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableCell}>{subCourse.noOfAttempts}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {course.course}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  </View>
);

export default CoursesPDFSection;
