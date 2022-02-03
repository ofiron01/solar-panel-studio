import {Routes, Route} from "react-router-dom";
import App from "./App";
import {appSteps} from "./constants";

function Router() {
return (
    <Routes>
        <Route path="/obstacles" element={<App step={appSteps.OBSTACLES} />} />
        <Route path="/blocks" element={<App step={appSteps.BLOCKS} />} />
        <Route path="/" element={<App step={appSteps.OBSTACLES} />} />
    </Routes>
    )
}

export default Router;
