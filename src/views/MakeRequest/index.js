import { Box, Grid } from "@material-ui/core";
import View from "../../shared/View";
import ProfileForm from "./ProfileForm";
import AvatarBar from "./AvatarBar";
import VotingState from "./VotingState";

export default function StudentProfile() {
  return (
    <div>
      <View title="Đăng kí tham gia">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <ProfileForm></ProfileForm>
          </Grid>
          <Grid item xs={12} md={4}>
            <AvatarBar></AvatarBar>
            <Box mt={2}>
              <VotingState></VotingState>
            </Box>
          </Grid>
        </Grid>
      </View>
    </div>
  );
}
