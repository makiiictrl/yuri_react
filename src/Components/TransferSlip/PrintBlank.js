// src/Components/TransferSlips/PrintBlank.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 5,
    position: "relative",
  },
  companyName: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
  },
  title: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoRow: {
    position: "absolute",
    top: 38,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  to: {
    position: "absolute",
    top: 38,
    left: 22,
    fontSize: 11,
  },
  tsNo: {
    position: "absolute",
    top: 38,
    left: 460,
    fontSize: 11,
  },

  tableContainer: {
    position: "absolute",
    top: 66,
    left: 18,
    width: 576, // sum of column widths
    borderWidth: 1,
    borderColor: "#000",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#fff", // no fill
    borderBottomWidth: 1,
    borderColor: "#000",
    height: 25,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    height: 20,
    alignItems: "center",
  },
  cell: (width) => ({
    width,
    textAlign: "center",
    fontSize: 11,
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 0,
    lineHeight: 1.2,
  }),

  // signatures
  sigBlock: {
    position: "absolute",
    top: 503,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 35,
    justifyContent: "space-between",
  },
  sigCol: { width: 260 },
  sigLabel: { fontSize: 12 },
  sigLine: {
    borderBottomWidth: 1,
    borderColor: "#000",
    width: "80%",
    marginVertical: 4,
  },
  sigNote: { fontSize: 8, textAlign: "center" },

  // dates
  dateBlock: {
    position: "absolute",
    top: 468,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 35,
    justifyContent: "space-between",
  },

  // footer
  footerRow: {
    position: "absolute",
    top: 441,
    left: 22,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
  },
  footerHR: {
    position: "absolute",
    top: 426,
    left: 20,
    right: 20,
    borderTopWidth: 1,
    borderColor: "#000",
  },
});

const COMPANY_NAMES = {
  1: "THE CATHAY DRUG CO., INC.",
  2: "YSS LABORATORIES CO. INC",
  5: "THE CATHAY YSS DISTRIBUTORS COMPANY INC.",
};

export function PrintBlank({ companyCode }) {
  const companyName = COMPANY_NAMES[companyCode] || "";

  // exact Prawn widths:
  const colWidths = [188, 84, 61, 63, 66, 114];
  const headers = [
    "PRODUCT DESCRIPTION",
    "LOT NO.",
    "MFG.\nDATE",
    "EXP.\nDATE",
    "QUANTITY",
    "REMARKS",
  ];

  return (
    <Document>
      <Page size={[612, 796]} style={styles.page}>
        {/* company + title */}
        <Text style={styles.companyName}>{companyName}</Text>
        <Text style={styles.title}>TRANSFER SLIP</Text>

        {/* TO / TS NO */}
        <Text style={styles.to}>TO:</Text>
        <Text style={styles.tsNo}>TS NO.:</Text>

        {/* Table */}
        <View style={styles.tableContainer}>
          {/* header */}
          <View style={styles.headerRow}>
            {headers.map((txt, i) => (
              <Text style={styles.cell(colWidths[i])} key={i}>
                {txt}
              </Text>
            ))}
          </View>
          {/* 10 blank rows */}
          {Array.from({ length: 10 }).map((_, r) => (
            <View style={styles.row} key={r}>
              {colWidths.map((w, c) => (
                <Text style={styles.cell(w)} key={c}>
                  {" "}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Signatures */}
        <View style={styles.sigBlock}>
          <View style={styles.sigCol}>
            <Text style={styles.sigLabel}>Transferred by:</Text>
            <View style={styles.sigLine} />
            <Text style={styles.sigNote}>Signature over printed name</Text>
          </View>
          <View style={styles.sigCol}>
            <Text style={styles.sigLabel}>Received by:</Text>
            <View style={styles.sigLine} />
            <Text style={styles.sigNote}>Signature over printed name</Text>
          </View>
        </View>
        <View style={styles.dateBlock}>
          <View style={styles.sigCol}>
            <Text style={styles.sigLabel}>Date:</Text>
            <View style={styles.sigLine} />
          </View>
          <View style={styles.sigCol}>
            <Text style={styles.sigLabel}>Date:</Text>
            <View style={styles.sigLine} />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <Text>Revision No.: 1</Text>
          <Text>QF-WH-018</Text>
          <Text>Issued Date: 05/14/2021</Text>
        </View>
        <View style={styles.footerHR} />
        <View style={styles.footerRow}>
          <Text>WHITE COPY: Receiving Section</Text>
          <Text>GREEN COPY: Warehouse</Text>
          <Text>PINK COPY: PPIC</Text>
        </View>
      </Page>
    </Document>
  );
}
