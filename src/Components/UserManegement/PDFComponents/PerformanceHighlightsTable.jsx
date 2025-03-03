import React from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./PDFStyles";

const PerformanceHighlightsTable = ({ userData }) => {


  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Performance Highlights</Text>

      {/* Table header */}
      <View style={styles.tableRow}>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>userData.</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Score</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Time Taken</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Attempts</Text>
        </View>
      </View>

      {/* Table rows */}
      {topCourses.map((course, index) => (
        <View
          key={index}
          style={index % 2 === 0 ? styles.tableRowEven : styles.tableRow}
        >
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{course.course}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{course.scoreAchieved}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{course.timeTaken}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{course.noOfAttempts}</Text>
          </View>
        </View>
      ))}

      {/* Summary statistics */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Average Score:</Text>
          <Text style={styles.summaryValue}>{userData.progress}%</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Completed Courses:</Text>
          <Text style={styles.summaryValue}>{userData.completedCourses}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Training Time:</Text>
          <Text style={styles.summaryValue}>
            {calculateTotalTrainingTime(
              userData.certificationsData.flatMap((course) => course.subCourses)
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Helper function to calculate total training time
const calculateTotalTrainingTime = (courses) => {
  let totalHours = 0;
  let totalMinutes = 0;

  courses.forEach((course) => {
    if (course.timeTaken !== "-") {
      const timeMatch = course.timeTaken.match(
        /(\d+)hr\s*(\d+)min|(\d+)\s*min/
      );
      if (timeMatch) {
        if (timeMatch[1] && timeMatch[2]) {
          // Format: "Xhr Ymin"
          totalHours += parseInt(timeMatch[1]);
          totalMinutes += parseInt(timeMatch[2]);
        } else if (timeMatch[3]) {
          // Format: "Xmin"
          totalMinutes += parseInt(timeMatch[3]);
        }
      }
    }
  });

  // Convert excess minutes to hours
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  return `${totalHours}hr ${totalMinutes}min`;
};

export default PerformanceHighlightsTable;
