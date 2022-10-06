import { SplitSyncContainer } from "ui/components/containers/SplitSyncContainer";
import { StatusBar } from "ui/components/StatusBar";
import { MenuBar } from "ui/components/MenuBar";
import { OpenFileModal } from "ui/components/modals/OpenFileModal";
import { SaveFileModal } from "ui/components/modals/SaveFileModal";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <OpenFileModal />
      <SaveFileModal />
      <div className="content">
        <MenuBar />
        <SplitSyncContainer />
        <StatusBar />
      </div>
      <Toaster />
    </>
  );
}

export default App;
