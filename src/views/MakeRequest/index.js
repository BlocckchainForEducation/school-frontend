import { Box, Grid } from "@material-ui/core";
import View from "../../shared/View";
import ProfileForm from "./ProfileForm";
import AvatarBar from "./AvatarBar";
import VotingState from "./VotingState";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function StudentProfile() {
  const votingState = useSelector((state) => state.profileSlice.state);
  return (
    <View title="Đăng kí tham gia">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <ProfileForm></ProfileForm>
        </Grid>
        <Grid item xs={12} md={4}>
          <AvatarBar></AvatarBar>
          <Box mt={2}>{votingState !== undefined && votingState !== "fail" && <VotingState></VotingState>}</Box>
        </Grid>
      </Grid>
    </View>
  );
}
