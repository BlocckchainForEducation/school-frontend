import { Box, Collapse } from "@material-ui/core";
import VoteBody from "src/shared/VoteBody";
import VoteHeader from "./VoteHeader";

export default function VoteRequest({ request }) {
  return (
    <Collapse in={request.in ?? true} collapsedHeight={0}>
      <Box mb={3}>
        <VoteHeader request={request}></VoteHeader>
        <VoteBody request={request}></VoteBody>
      </Box>
    </Collapse>
  );
}
