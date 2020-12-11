import { Avatar, Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/mng-token";
import { updateVotes, updateVotingState } from "./redux";

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
  const dp = useDispatch();

  useEffect(() => {
    if (votingState === "voting") {
      const clockId = setInterval(async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/university-profile`, { headers: { Authorization: getToken() } });
        if (res.ok) {
          const body = await res.json();
          if (body) {
            dp(updateVotingState(body));
          }
        }
      }, 5000);
      console.log("clockId " + clockId);
      return () => {
        console.log("clear clockId: " + clockId);
        window.clearInterval(clockId);
      };
    }
  });

  return (
    <div>
      <Box className={cls.root}>
        <Paper className={cls.head}>
          <Typography variant="h3">
            {/* TODO: Add Icons too, change color accroding to votingState*/}
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
                      {/* TODO: vote now have no name, but pubkey instead, so we will fetch university from UniversityProfile first */}
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
