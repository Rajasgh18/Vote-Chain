import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import User from "./pages/user";

const App = () => {

  return (
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/*" element={<User />} />
    </Routes>
  );
};

export default App;
