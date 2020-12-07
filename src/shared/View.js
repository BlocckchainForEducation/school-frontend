import { Box, Container } from "@material-ui/core";
import Page from "./Page";

export default function View({ children, title }) {
  return (
    <Page title={title}>
      <Container style={{ minHeight: "100%" }}>
        <Box py={3} style={{ minHeight: "100%" }}>
          {children}
        </Box>
      </Container>
    </Page>
  );
}
