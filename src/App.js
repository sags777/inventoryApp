import "./App.css";
import Main from "./pages/main/Main";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer theme="dark" />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
