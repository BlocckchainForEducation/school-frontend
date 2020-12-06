import { Avatar, Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

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
  // box: {
  //   padding: theme.spacing(8, 3, 3, 3),
  //   "& > *": {
  //     marginBottom: theme.spacing(4),
  //     "&:last-child": {
  //       marginBottom: 0,
  //     },
  //   },
  // },
}));
export default function VotingState(props) {
  const cls = useStyles();

  return (
    <div>
      <Box className={cls.root}>
        <Paper className={cls.head}>
          <Typography variant="h3">Đang bỏ phiếu</Typography>
        </Paper>
        <Paper className={cls.body}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Avatar></Avatar>
                  </TableCell>
                  <TableCell>Đại học Bách Khoa</TableCell>
                  <TableCell>
                    <CheckIcon color="primary"></CheckIcon>
                  </TableCell>
                  <TableCell>
                    <i>
                      <small>2020-12-08</small>
                    </i>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar></Avatar>
                  </TableCell>
                  <TableCell>Đại học KTQD</TableCell>
                  <TableCell>
                    <CloseIcon color="secondary"></CloseIcon>
                  </TableCell>
                  <TableCell>
                    <i>
                      <small>2020-12-10</small>
                    </i>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar></Avatar>
                  </TableCell>
                  <TableCell>Đại học XD</TableCell>
                  <TableCell>
                    <CheckIcon color="primary"></CheckIcon>
                  </TableCell>
                  <TableCell>
                    <i>
                      <small>2020-12-11</small>
                    </i>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
