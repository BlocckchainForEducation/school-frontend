import Page from "../../../shared/Page";
import RevokeForm from "./RevokeForm";
import RevokeSearchResult from "./RevokeSearchResult";

export default function RevokeCertificate() {
  return (
    <Page title="Thu hồi bằng cấp">
      <RevokeForm></RevokeForm>
      <RevokeSearchResult></RevokeSearchResult>
    </Page>
  );
}
