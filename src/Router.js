import {Routes, Route} from "react-router-dom";
import App from "./App";
import {appSteps} from "./constants";

function Router() {
return (
    <Routes>
        <Route path={appSteps.IMAGE_UPLOAD} element={<App step={appSteps.IMAGE_UPLOAD} />} />
        <Route path={appSteps.OBJECTS} element={<App step={appSteps.OBJECTS} />} />
        <Route path={appSteps.BLOCKS} element={<App step={appSteps.BLOCKS} />} />
        <Route path="/" element={<App step={appSteps.IMAGE_UPLOAD} />} />
    </Routes>
    )
}

export default Router;
