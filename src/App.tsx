import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Volunteers from './pages/Volunteers';
import Contact from './pages/Contact';
import Events from './pages/Events';

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
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            
            {/* Add other routes as they are implemented */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;