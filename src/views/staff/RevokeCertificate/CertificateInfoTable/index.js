import { Divider, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Body from "./Body";
import Title from "./Title";

export default function CertificateInfoTable() {
  const document = useSelector((state) => state.revokeCertificateSlice.document);

  return (
    document && (
      <Paper>
        <Title cert={document.versions[document.versions.length - 1]}></Title>
        <Divider></Divider>
        <Body cert={document.versions[document.versions.length - 1]}></Body>
      </Paper>
    )
  );
}
