import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@material-ui/lab";
import { useSelector } from "react-redux";
import CertificateInfoTable from "./CertificateInfoTable";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    "& .MuiTimelineItem-missingOppositeContent:before": {
      flex: 0,
      padding: 0,
    },
  },
}));

export default function SearchResult(props) {
  const cls = useStyles();

  const document = useSelector((state) => state.revokeCertificateSlice.document);
  return (
    <div>
      {document && (
        // <Paper>
        <Timeline align="left" className={cls.root}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={document.versions[document.versions.length - 1].type === "revoke" ? "secondary" : "primary"}
              ></TimelineDot>
              <TimelineConnector></TimelineConnector>
            </TimelineSeparator>
            <TimelineContent>
              <Paper style={{ padding: 8 }}>
                <Typography>{toDateTimeString(document.versions[document.versions.length - 1].timestamp)}</Typography>
              </Paper>
              <Box mt={2}>
                <CertificateInfoTable cert={document.versions[document.versions.length - 1]}></CertificateInfoTable>
              </Box>
            </TimelineContent>
          </TimelineItem>
          {document.versions
            .slice(0, -1)
            .reverse()
            .map((version, index) => (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color={version.type === "revoke" ? "secondary" : "primary"}></TimelineDot>
                  {index !== document.versions.length - 2 && <TimelineConnector></TimelineConnector>}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper style={{ padding: 8 }}>
                    <Typography>
                      {`v${version.version}, ${toDateTimeString(version.timestamp)}: `}
                      <strong>{version.type === "revoke" ? "Thu hồi" : "Cấp lại"}</strong>
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
        // </Paper>
      )}
    </div>
  );
}

function toDateTimeString(timestamp) {
  return ` ${new Date(timestamp).toISOString().split("T")[0]}, ${new Date(timestamp).toISOString().split("T")[1].split(".")[0]}`;
}
