import type { Component } from 'solid-js';
import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

//components
const NavBar = lazy(() => import("./components/NavBar"));

//pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const App: Component = () => {
  return (
    <div class="md:container md:mx-auto h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
