import { SplitSyncContainer } from "ui/components/containers/SplitSyncContainer";
import { StatusBar } from "ui/components/StatusBar";
import { MenuBar } from "ui/components/MenuBar";

function App() {
  return (
    <>
      <div className="grid grid-rows-layout h-full">
        <MenuBar />
        <SplitSyncContainer />
        <StatusBar />
      </div>
    </>
  );
}

export default App;
