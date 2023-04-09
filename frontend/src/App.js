import AppRouter from "./components/AppRouter";
import { Toaster } from "react-hot-toast";
import LeftBarComponent from "./components/LeftBarComponent";
function App() {
  return (
    <div className="app-container">
    <LeftBarComponent/>
    <Toaster/>
    <AppRouter/>
    </div>
  );
}

export default App;