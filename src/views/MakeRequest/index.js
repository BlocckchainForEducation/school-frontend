import { Box, Grid } from "@material-ui/core";
import ProfileForm from "./ProfileForm";
import AvatarBar from "./AvatarBar";
import VotingState from "./VotingState";
import { useState } from "react";
import { useSelector } from "react-redux";
import Page from "../../shared/Page";

export default function StudentProfile() {
  const votingState = useSelector((state) => state.profileSlice.state);
  return (
    <Page title="Đăng kí tham gia">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProfileForm></ProfileForm>
        </Grid>
        <Grid item xs={12} md={4}>
          <AvatarBar></AvatarBar>
          <Box mt={2}>{votingState !== undefined && votingState !== "fail" && <VotingState></VotingState>}</Box>
        </Grid>
      </Grid>
    </Page>
  );
}
