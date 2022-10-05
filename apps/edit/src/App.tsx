import { SplitSyncContainer } from "ui/components/containers/SplitSyncContainer";
import { StatusBar } from "ui/components/StatusBar";
import { MenuBar } from "ui/components/MenuBar";
import { OpenFileModal } from "ui/components/modals/OpenFileModal";

function App() {
  return (
    <>
      <OpenFileModal />
      <div className="content">
        <MenuBar />
        <SplitSyncContainer />
        <StatusBar />
      </div>
    </>
  );
}

export default App;
