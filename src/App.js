import Stage from "./components/Stage";
import data from "./mock/sat01.json";
import {useEffect, useState} from "react";
import {appSteps, toolbarItemsMap} from "./constants";
import Toolbar from "./components/Toolbar";
import {useNavigate, useLocation} from "react-router-dom";
import StateDialog from "./components/StateDialog";
import ImageUpload from "./components/ImageUpload";

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
    const [blockToolSelected, setBlockToolSelected] = useState(step !== appSteps.IMAGE_UPLOAD ? toolbarItemsMap[step][0].id : null);
    const [isModalVisible, setIsModalVisible] = useState(false);


    //init setBlockToolSelected
    useEffect(() => {
        if (pathname === '/') {
            navigate(appSteps.IMAGE_UPLOAD);
        }
        if (step !== appSteps.IMAGE_UPLOAD) {
            setBlockToolSelected(toolbarItemsMap[step][0].id);
        }
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
            {
                step !== appSteps.IMAGE_UPLOAD ?
                <Stage
                    step={step}
                    zoomLevel={stageZoom}
                    gridOpacity={gridOpacity}
                    rotation={stageRotation}
                    blockToolSelected={blockToolSelected}
                    projectData={{
                        ...projectState,
                        satImageUrl: projectState.image || '',
                    }}
                    handleDataChange={data => setProjectState(data)}
                />
                    :<ImageUpload handleDataChange={data => setProjectState({
                    ...projectState,
                    ...data,
                    })} />
            }

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
