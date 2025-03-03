import { StyleSheet } from "@react-pdf/renderer";

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    marginBottom: 10
  },
  column: {
    flexDirection: "column",
    marginRight: 15,
    flex: 1
  },
  text: {
    fontSize: 12,
    marginBottom: 5
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5
  },
  subCourse: {
    marginLeft: 10,
    fontSize: 11
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: "center",
    color: "grey"
  },
  confidentialWatermark: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0, 100, 200, 0.6)",
    padding: 10
  },
  watermarkText: {
    fontSize: 16,
    color: "white"
  },
  scoreHighlight: {
    fontSize: 12,
    backgroundColor: "#e6f7ff",
    padding: 5,
    marginTop: 10
  },
  
  // Table styles
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 24,
    fontSize: 12
  },
  tableRowEven: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 24,
    fontSize: 12,
    backgroundColor: "#f2f2f2"
  },
  tableHeaderCell: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#0066cc",
    color: "#ffffff"
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff"
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5
  },
  tableCellText: {
    fontSize: 10
  },
  
  // Summary section styles
  summaryContainer: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  summaryItem: {
    flexDirection: "column",
    alignItems: "center"
  },
  summaryLabel: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 3
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0066cc"
  }
});

export default styles;