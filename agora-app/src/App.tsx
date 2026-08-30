import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import CharacterPage from "./pages/CharacterPage";
import DialoguePage from "./pages/DialoguePage";
import RosterPage from "./pages/RosterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RosterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dialogue" element={<DialoguePage />} />
      <Route path="/:characterId" element={<CharacterPage />} />
    </Routes>
  );
}
