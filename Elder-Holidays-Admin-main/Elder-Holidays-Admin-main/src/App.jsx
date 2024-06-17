import Routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Routes />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
