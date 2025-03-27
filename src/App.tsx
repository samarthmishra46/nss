import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";

import Contact from "./pages/Contact";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail.tsx";
import Newsletters from "./pages/Newsletters";
import Login from "./pages/auth.tsx";
import Donate from "./pages/Donate";
import Dashboard from "./pages/Dashboard.tsx";
import Profile from "./pages/Profile.tsx";
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/newsletters" element={<Newsletters />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
y          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
