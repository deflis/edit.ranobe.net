import { StatusBar } from "ui/components/StatusBar";
import { MenuBar } from "ui/components/MenuBar";
import { OpenFileModal } from "ui/components/modals/OpenFileModal";
import { SaveFileModal } from "ui/components/modals/SaveFileModal";
import { VersionModal } from "ui/components/modals/VersionModal";
import { Toaster } from "react-hot-toast";
import { Container } from "ui/components/containers/Container";

function App() {
  return (
    <>
      <OpenFileModal />
      <SaveFileModal />
      <VersionModal
        version={`v1-${__BRANCH_NAME}-${__COMMIT_HASH}(${__COMMIT_DATE})`}
      />
      <div className="content">
        <MenuBar />
        <Container />
        <StatusBar />
      </div>
      <Toaster />
    </>
  );
}

export default App;
