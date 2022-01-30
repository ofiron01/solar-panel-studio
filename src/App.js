import Stage from "./components/Stage";
import RoofSatImage from "./assets/sat01.png";

import data from "./mock/sat01.json";
import {useState} from "react";
import {gridBlockTypes} from "./constants";
import Toolbar from "./components/Toolbar";

function App() {
    const [stageZoom, setStageZoom] = useState(1);
    const [gridOpacity, setGridOpacity] = useState(100);
    const [stageRotation, setStageRotation] = useState(0);
    const [blockToolSelected, setBlockToolSelected] = useState(gridBlockTypes.LEVEL_A.id)

    return (
        <div>
            <Stage
                zoomLevel={stageZoom}
                gridOpacity={gridOpacity}
                rotation={stageRotation}
                blockToolSelected={blockToolSelected}
                projectData={{
                ...data,
                satImageUrl: RoofSatImage,
            }}/>
            <Toolbar
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
