import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "src/shared/Page";
import RequestList from "./RequestList";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default function Voting(props) {
  const cls = useStyles();
  const votingState = useSelector((state) => state.profileSlice.state);

  return (
    <Page title="Voting">
      {votingState === "accepted" ? (
        <RequestList></RequestList>
      ) : (
        <div className={cls.flexContainer}>
          <Typography variant="h3">Hiện tại bạn chưa thể thực hiện bỏ phiếu!</Typography>
          <Typography variant="subtitle1">Sau khi tham gia thành công bạn sẽ có thể thực hiện bỏ phiếu.</Typography>
        </div>
      )}
    </Page>
  );
}
