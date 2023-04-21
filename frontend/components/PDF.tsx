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

const MyDoc = ({ user }: { user: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Make a view to see the user data */}
      <View style={styles.section}>
        <Text>Name: {user["user_name"]}</Text>
        <Text>First Last Name: {user["first_last_name"]}</Text>
        <Text>Second Last Name: {user["second_last_name"]}</Text>
        <Text>Born Date: {user["born_date"]}</Text>
        <Text>Nationality: {user["nationality"]}</Text>
        <Text>State of Birth: {user["state_of_birth"]}</Text>
        <Text>Economic Activity: {user["economic_activity"]}</Text>
        <Text>CURP: {user["curp"]}</Text>
        <Text>RFC: {user["rfc"]}</Text>
        <Text>Gender: {user["gender"]}</Text>
        <Text>Phone Number: {user["phone_number"]}</Text>
        <Text>Email: {user["email"]}</Text>
        <Text>Country: {user["country"]}</Text>
        <Text>State: {user["state"]}</Text>
        <Text>City: {user["city"]}</Text>
        <Text>Neighborhood: {user["neighborhood"]}</Text>
        <Text>ZIP Code: {user["zip_code"]}</Text>
        <Text>Street: {user["street"]}</Text>
        <Text>Ext Number: {user["ext_number"]}</Text>
        <Text>Int Number: {user["int_number"]}</Text>

        <Text>Identification Type: {user["identification_type"]}</Text>
        <Text>
          Identification Reference: {user["identification_reference"]}
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyDoc;
