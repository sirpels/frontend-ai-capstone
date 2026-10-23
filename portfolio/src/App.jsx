import { Navbar, Hero, About, Building, Contact, Footer } from './components/Sections';
import Projects from './components/Projects';
import './App.css';
function App() { return <><a className="skip" href="#main">Skip to content</a><Navbar /><main id="main"><Hero /><Projects /><About /><Building /><section className="section notes"><div><p className="eyebrow">FIELD NOTES</p><h2>Writing &amp; Learning</h2><p>I’ll be sharing what I’m learning about frontend development, Shopify, AI-assisted development, and building real projects.</p><span className="status">Posts coming soon.</span></div><div><p className="eyebrow">NEXT CHAPTER</p><h2>FlyRank AI Fluency Capstone</h2><p>The project and FlyRank completion badge will be added after the capstone is completed.</p><span className="status">Coming soon.</span></div></section><Contact /></main><Footer /></>; }
export default App;
