import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Create from './pages/create';
import Index from './pages';
import Redirect from './pages/redirect';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Create />} />
            <Route path="create"  element={<Create />} />
            <Route path="list" element={<Index />} />
            <Route path="/:code" element={<Redirect />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
