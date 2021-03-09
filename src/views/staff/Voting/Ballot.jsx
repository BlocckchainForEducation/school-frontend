import { Box, Collapse } from "@material-ui/core";
import BallotBody from "src/shared/BallotBody";
import VoteHeader from "./BallotHeader";

export default function Ballot({ request }) {
  return (
    <Collapse in={request.in ?? true} collapsedHeight={0}>
      <Box mb={3}>
        <VoteHeader request={request}></VoteHeader>
        <BallotBody request={request}></BallotBody>
      </Box>
    </Collapse>
  );
}
