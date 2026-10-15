import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import Bookmarks from "./pages/Bookmarks";
import CreateBookmark from "./pages/CreateBookmark";
import EditBookmark from "./pages/EditBookmark";
import { AppLayout } from "./components/ui/Layout/AppLayout/AppLayout";
import { AuthLayout } from "./components/ui/Layout/AuthLayout/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/bookmarks/new" element={<CreateBookmark />} />
          <Route path="/bookmarks/:id/edit" element={<EditBookmark />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
