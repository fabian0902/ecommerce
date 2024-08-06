import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./GLobalState";

import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            
            <Route path="*" element={<MainPages />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
