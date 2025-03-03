import React from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./PDFStyles";

const PerformancePDFSection = ({ achievements }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Performance & Achievements</Text>
    {achievements.map((achievement, index) => (
      <Text key={index} style={styles.text}>
        • {achievement}
      </Text>
    ))}
  </View>
);

export default PerformancePDFSection;
