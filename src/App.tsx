import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alert from "./components/Alert";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import MainApp from "./pages/MainApp";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="app" element={<MainApp />}></Route>
          </Routes>
        </BrowserRouter>
        <Alert />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
