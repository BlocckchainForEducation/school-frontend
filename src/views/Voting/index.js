import View from "../../shared/utils/View";
import RequestList from "./RequestList";

export default function Voting(props) {
  return (
    <div>
      <View title="Voting">
        <RequestList></RequestList>
      </View>
    </div>
  );
}
