import { Routes, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Home from './routes/Home';
import About from './routes/About';
import Pricing from './routes/Pricing';
import Resources from './routes/Resources';
import ResourcesLogin from './routes/ResourcesLogin';
import Contact from './routes/Contact';
import ResourceArticle from './routes/ResourceArticle';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-base-100 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceArticle />} />
          <Route path="/resources-login" element={<ResourcesLogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default App;
