import Stage from "./components/Stage";
import RoofSatImage from "./assets/sat01.png";

import data from "./mock/sat01.json";
import {useEffect, useState} from "react";
import {appSteps, toolbarItemsMap} from "./constants";
import Toolbar from "./components/Toolbar";
import {useNavigate, useLocation} from "react-router-dom";
import StateDialog from "./components/StateDialog";

const useDebouncedEffect = (effect, deps, delay) => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps || [], delay]);
}

function App({step}) {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [projectState, setProjectState] = useState(data);
    const [stageZoom, setStageZoom] = useState(projectState.viewZoom);
    const [gridOpacity, setGridOpacity] = useState(100);
    const [stageRotation, setStageRotation] = useState(projectState.viewOrientation);
    const [blockToolSelected, setBlockToolSelected] = useState(toolbarItemsMap[step][0].id);
    const [isModalVisible, setIsModalVisible] = useState(false);


    //init setBlockToolSelected
    useEffect(() => {
        //console.log(pathname);
        if (pathname === '/') {
            navigate(appSteps.OBJECTS);
        }
        setBlockToolSelected(toolbarItemsMap[step][0].id);
    }, [pathname, step, navigate]);

    //Update project state whenever stage zoom and rotation changes
    useEffect(() => {
        setProjectState(prevState => ({
            ...prevState,
            viewZoom: stageZoom,
            viewOrientation: stageRotation,
        }));
    }, [stageZoom, stageRotation]);

    //Update stage zoom and rotation whenever project state is changing
    useEffect(() => {
        setStageZoom(projectState.viewZoom);
        setStageRotation(projectState.viewOrientation);
    }, [projectState.viewOrientation, projectState.viewZoom]);

    //Update route in project state when it changes in react-router
    useEffect(() => {
        if (pathname === projectState.viewRoute) {
            return;
        }
        console.log('Update route in project state to ', pathname)
        setProjectState(prevState => ({
            ...prevState,
            viewRoute: pathname,
        }));

    }, [pathname]);

    //Navigate to route when it changes in project state
    useDebouncedEffect(() => {
        if (projectState.viewRoute === '/') {
            return;
        }
        console.log('Navigate to route ', projectState.viewRoute)
        navigate(projectState.viewRoute);
    }, [projectState.viewRoute, navigate], 200);

    return (
        <div>
            <Stage
                step={step}
                zoomLevel={stageZoom}
                gridOpacity={gridOpacity}
                rotation={stageRotation}
                blockToolSelected={blockToolSelected}
                projectData={{
                    ...projectState,
                    satImageUrl: RoofSatImage,
                }}
                handleDataChange={data => setProjectState(data)}
            />
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
                setIsModalVisible={setIsModalVisible}
            />

            <StateDialog
                isOpen={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                projectState={projectState}
                onApply={data => setProjectState(data)}
            />

        </div>
  );
}

export default App;
