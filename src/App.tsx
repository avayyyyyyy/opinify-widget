import "./App.css";
import { CustomWidget } from "./components/custom-widget";
import { Toaster } from "./components/sonner";

function App() {
  return (
    <div className="fixed bottom-6 right-6">
      <Toaster richColors duration={4000} closeButton />
      <CustomWidget projectid="clzjcvzw8001gh3axuwaszzgz" />
    </div>
  );
}

export default App;
