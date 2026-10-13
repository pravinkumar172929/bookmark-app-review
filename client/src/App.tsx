import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import Bookmarks from "./pages/Bookmarks";
import CreateBookmark from "./pages/CreateBookmark";
import EditBookmark from "./pages/EditBookmark";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/bookmarks/new" element={<CreateBookmark />} />
        <Route path="/bookmarks/:id/edit" element={<EditBookmark />} />
      </Routes>
    </>
  );
}

export default App;
