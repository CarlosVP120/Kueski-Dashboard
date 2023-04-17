import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// {user["First Last Name"]}
// {user["Second Last Name"]}
// {user["Born Date"]}
// {user["Nationality"]}
// {user["State of Birth"]}
// {user["Economic Activity"]}
// {user["CURP"]}
// {user["RFC"]}
// {user["Gender"]}
// {user["Phone Number"]}
// {user["Email"]}
// {user["Country"]}
// {user["State"]}
// {user["City"]}
// {user["Neighborhood"]}
// {user["ZIP Code"]}
// {user["Street"]}
// {user["Ext Number"]}
// {user["Int Number"]}
// {user["Additional Contact Name"]}
// {user["Additional Contact Number"]}
// {user["Additional Contact Salary Range"]}
// {user["Identification Type"]}
// {user["Identification Number"]}

const MyDoc = ({ user }: { user: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Make a view to see the user data */}
      <View style={styles.section}>
        <Text>Name: {user["Name"]}</Text>
        <Text>First Last Name: {user["First Last Name"]}</Text>
        <Text>Second Last Name: {user["Second Last Name"]}</Text>
        <Text>Born Date: {user["Born Date"]}</Text>
        <Text>Nationality: {user["Nationality"]}</Text>
        <Text>State of Birth: {user["State of Birth"]}</Text>
        <Text>Economic Activity: {user["Economic Activity"]}</Text>
        <Text>CURP: {user["CURP"]}</Text>
        <Text>RFC: {user["RFC"]}</Text>
        <Text>Gender: {user["Gender"]}</Text>
        <Text>Phone Number: {user["Phone Number"]}</Text>
        <Text>Email: {user["Email"]}</Text>
        <Text>Country: {user["Country"]}</Text>
        <Text>State: {user["State"]}</Text>
        <Text>City: {user["City"]}</Text>
        <Text>Neighborhood: {user["Neighborhood"]}</Text>
        <Text>ZIP Code: {user["ZIP Code"]}</Text>
        <Text>Street: {user["Street"]}</Text>
        <Text>Ext Number: {user["Ext Number"]}</Text>
        <Text>Int Number: {user["Int Number"]}</Text>
        <Text>Additional Contact Name: {user["Additional Contact Name"]}</Text>
        <Text>
          Additional Contact Number: {user["Additional Contact Number"]}
        </Text>
        <Text>
          Additional Contact Salary Range:{" "}
          {user["Additional Contact Salary Range"]}
        </Text>
        <Text>Identification Type: {user["Identification Type"]}</Text>
        <Text>Identification Number: {user["Identification Number"]}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDoc;
