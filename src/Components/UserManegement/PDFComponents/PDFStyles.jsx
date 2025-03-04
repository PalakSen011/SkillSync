import { StyleSheet } from "@react-pdf/renderer";

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 25,
  },
  section: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
    color: "#333333",
  },
  // User information styling - full width
  userInfoContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    textAlign: "center",
  },
  userImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#CCCCCC",
    marginBottom: 12,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  userDetails: {
    textAlign: "center",
  },
  // Chart image styling
  chartContainer: {
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
  },
  chartImage: {
    width: "95%",
    height: "auto",
  },
  // Performance card styling
  performanceSection: {
    margin: 8,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
  },
  performanceItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 8,
    marginBottom: 5,
  },
  performanceLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "bold",
    color: "#444444",
  },
  performanceValue: {
    flex: 1,
    fontSize: 13,
    textAlign: "right",
    color: "#222222",
  },
  // Table styling - refined spacing
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 18,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 7,
    backgroundColor: "#EDEDED",
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
    color: "#333333",
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 6,
    fontSize: 10,
    textAlign: "center",
    color: "#555555",
  },
  subRow: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
  },
  subCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.8,
    padding: 5,
    fontSize: 9,
    textAlign: "center",
    color: "#666666",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222222",
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
    color: "#444444",
  },
  courseProgressSection: {
    marginVertical: 12,
  },
  courseProgressItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  courseProgressName: {
    flex: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: "#444444",
  },
  courseProgressValue: {
    flex: 1,
    fontSize: 12,
    textAlign: "right",
    color: "#222222",
  },
});

export default styles;
