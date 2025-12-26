import { BrowserRouter, Routes, Route } from "react-router-dom";
import WomenPatientsPage from "./pages/WomenPatientsPage";
import WomenCommunityPage from "./pages/WomenCommunityPage";
import WomenCommunityPage1 from "./pages/WomenCommunityPage1";
import WomenChildPage from "./pages/WomenChildPage";
import WomenHealthPostsDashboard from "./pages/WomenHealthPostsDashboard";
import WomenHealthCommunitiesDashboard1 from "./pages/WomenHealthCommunitiesDashboard1";
import WomenHealthCommunitiesDashboard from "./pages/WomenHealthCommunitiesDashboard";
import WomenHealthProducts from "./pages/WomenHealthProducts";
import WomenInsuranceProductCatlg from "./pages/WomenInsuranceProductCatlg";
import WomenDiscordHealthApp from "./pages/WomenDiscordHealthApp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/community" element={<WomenCommunityPage/>} />
         <Route path="/community1" element={<WomenCommunityPage1 />} />
         <Route path="/patients" element={<WomenPatientsPage />} />
         <Route path="/womenChild" element={<WomenChildPage />} />
         <Route path="/wmhealthpostsdashboard" element={<WomenHealthPostsDashboard />} />
         <Route path="/wmhealthcommhdashboard" element={<WomenHealthCommunitiesDashboard />} />
         <Route path="/Womenhealthproducts" element={<WomenHealthProducts/>} />
         <Route path="/Womeninsuranceprods" element={<WomenInsuranceProductCatlg/>} />
         <Route path="/discordapp" element={<WomenDiscordHealthApp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/*import React from 'react';
import WomenChild from './WomenChildPage'; // Import your new component
import './App.css'; // Optional: for global styles

function App() {
  return (
    <div className="App">
      <WomenChild/>
    </div>
  );
}

export default App;*/