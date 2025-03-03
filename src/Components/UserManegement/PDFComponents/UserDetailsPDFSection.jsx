import React from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./PDFStyles";

const UserDetailsPDFSection = ({ userData }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>User Details</Text>
    <View style={styles.row}>
      {/* User Profile Information */}
      <View style={styles.column}>
        <Text style={styles.text}>Name: {userData.firstName} </Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
        <Text style={styles.text}>Role: {userData.role}</Text>
        <Text style={styles.text}>Department: {userData.department}</Text>
      </View>
      
      {/* Training Progress Information */}
      <View style={styles.column}>
        <Text style={styles.text}>Completed Courses: {userData.completedCourses}</Text>
        <Text style={styles.text}>Progress: {userData.progress}%</Text>
        <Text style={styles.text}>Certifications: {userData.certifications}</Text>
      </View>
    </View>
  </View>
);

export default UserDetailsPDFSection;