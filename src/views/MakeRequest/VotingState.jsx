import { Avatar, Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-sizeSmall": {
      padding: theme.spacing(1),
    },
  },
  head: {
    width: "95%",
    margin: "auto",
    padding: theme.spacing(2.5, 2),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    position: "relative", // this bring head foreground
  },
  body: { width: "100%", marginTop: "-32px", padding: theme.spacing(6, 2, 2, 2) },
}));
export default function VotingState(props) {
  const cls = useStyles();
  const votingState = useSelector((state) => state.profileSlice.state);
  const votes = useSelector((state) => state.profileSlice.votes);

  return (
    <div>
      <Box className={cls.root}>
        <Paper className={cls.head}>
          <Typography variant="h3">
            {votingState === "voting" && "Đang bỏ phiếu"}
            {votingState === "accepted" && "Đã tham gia"}
            {votingState === "declined" && "Đã bị từ chối"}
          </Typography>
        </Paper>
        <Paper className={cls.body}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {votes &&
                  votes.map((vote, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar></Avatar>
                      </TableCell>
                      <TableCell>{vote.name}</TableCell>
                      <TableCell>
                        {vote.decision === "accept" && <CheckIcon color="primary"></CheckIcon>}
                        {vote.decision === "decline" && <CloseIcon color="secondary"></CloseIcon>}
                      </TableCell>
                      <TableCell>
                        <i>
                          <small>{vote.time}</small>
                        </i>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
