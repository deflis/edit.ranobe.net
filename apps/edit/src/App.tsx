import { useState } from "react";
import { Button } from "ui/components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Button>ボタン</Button>
    </div>
  );
}

export default App;
