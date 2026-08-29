import { Route, Routes } from "react-router-dom";
import DialoguePage from "./pages/DialoguePage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dialogue" element={<DialoguePage />} />
    </Routes>
  );
}
