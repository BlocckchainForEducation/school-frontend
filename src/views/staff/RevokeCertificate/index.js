import Page from "../../../shared/Page";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import { Box } from "@material-ui/core";

export default function RevokeCertificate() {
  return (
    <Page title="Thu hồi bằng cấp">
      {/* <Box px={3}> */}
      <SearchBox></SearchBox>
      {/* </Box> */}
      <Box mt={3}>
        <SearchResult></SearchResult>
      </Box>
    </Page>
  );
}
