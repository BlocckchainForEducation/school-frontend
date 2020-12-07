import React from "react";
import { Accordion } from "@material-ui/core";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimpleTable from "./../Table/SimpleTable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function UploadHistory({ histories }) {
  const classes = useStyles();
  return (
    <div>
      {histories.map((history, index) => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id={history.id}>
            <Typography className={classes.heading}>{`#${index + 1}, ${history.time}, ${history.note ? history.note : ""}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SimpleTable head={history.heads} body={history.rows}></SimpleTable>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
