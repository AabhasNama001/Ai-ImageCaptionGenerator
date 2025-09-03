import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api/axios";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Check user on page load
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold">
          🖼 AI Caption Generator
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span>Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <CreatePost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
