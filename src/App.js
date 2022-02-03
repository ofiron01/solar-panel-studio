import Stage from "./components/Stage";
import RoofSatImage from "./assets/sat01.png";

import data from "./mock/sat01.json";
import {useEffect, useState} from "react";
import {appSteps, toolbarItemsMap} from "./constants";
import Toolbar from "./components/Toolbar";
import {useNavigate, useLocation} from "react-router-dom";

function App({step}) {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [stageZoom, setStageZoom] = useState(1);
    const [gridOpacity, setGridOpacity] = useState(100);
    const [stageRotation, setStageRotation] = useState(0);
    const [blockToolSelected, setBlockToolSelected] = useState(toolbarItemsMap[step][0].id);

    useEffect(() => {
        console.log(pathname);
        if (pathname === '/') {
            navigate(appSteps.OBSTACLES);
        }
        setBlockToolSelected(toolbarItemsMap[step][0].id);
    }, [pathname, step, navigate])

    return (
        <div>
            <Stage
                step={step}
                zoomLevel={stageZoom}
                gridOpacity={gridOpacity}
                rotation={stageRotation}
                blockToolSelected={blockToolSelected}
                projectData={{
                ...data,
                satImageUrl: RoofSatImage,
            }}/>
            <Toolbar
                toolItems={toolbarItemsMap[step]}
                gridOpacity={gridOpacity}
                setGridOpacity={setGridOpacity}
                stageZoom={stageZoom}
                setStageZoom={setStageZoom}
                blockToolSelected={blockToolSelected}
                setBlockToolSelected={setBlockToolSelected}
                stageRotation={stageRotation}
                setStageRotation={setStageRotation}
            />
        </div>
  );
}

export default App;
