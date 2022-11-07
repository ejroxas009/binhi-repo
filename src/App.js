import { Routes, Route } from "react-router-dom";

//Pages
import { LoginPage } from "./pages/shared/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default App;
