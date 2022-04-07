import styled from 'styled-components';
import SiteElementsGrid from "./SiteElementsGrid";
import {useEffect, useState} from "react";
import SiteCanvas from "./SiteCanvas";
import SiteObstaclesPlacement from "./SiteObstaclesPlacement";
import {appSteps} from "../constants";

const StageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StageContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    transform-origin: center center;
    transition: 0.25s all;
    margin-top: 100px;
    transform: ${({rotation, zoom}) => `rotate(${rotation}deg) scale(${zoom})`};
`;

const BLOCK_ID_INDEX = 4;

function Stage({step, projectData, zoomLevel, gridOpacity, blockToolSelected, rotation, handleDataChange}) {
    const [gridState, setGridState] = useState(projectData.blocks);
    const [obstaclePlacementState, setObstaclePlacementState] = useState(projectData.objects)
    const [image, setImage] = useState({width: 0, height: 0});

    const handleGridClick = evt => {
        let newGridState;
        newGridState = gridState.map((block, index) => {
            if (index === parseInt(evt.target.dataset.blockid) ||
                index === parseInt(evt.target.parentElement.dataset.blockid)
            ) {
                console.log(blockToolSelected);
                block[BLOCK_ID_INDEX] = blockToolSelected;
            }
            return block;
        })
        setGridState(newGridState);
        handleDataChange({
            ...projectData,
            blocks: gridState,
        });
    }

    const handlePlaceObstacle = evt => {
        const x = evt.nativeEvent.offsetX;
        const y = evt.nativeEvent.offsetY;
        console.log(evt.nativeEvent.offsetX, evt.nativeEvent.offsetY);

        let updatedObstaclePlacementState;
        if (evt.target.dataset.id !== 'obstaclesWrapper') {
            console.log(evt.target.parentElement.parentElement.dataset.id, ' is not obstaclesWrapper, removing clicked item');
            updatedObstaclePlacementState = obstaclePlacementState.filter(obstacle => {
                const [,,,id] = obstacle;
                return (
                    id !== parseInt(evt.target.parentElement.dataset.id) &&
                    id !== parseInt(evt.target.parentElement.parentElement.dataset.id)
                );
            })

        } else {
            updatedObstaclePlacementState = [
                ...obstaclePlacementState,
                [x, y, blockToolSelected, obstaclePlacementState.length]
            ];
        }

        setObstaclePlacementState(updatedObstaclePlacementState);
        handleDataChange({
            ...projectData,
            objects: updatedObstaclePlacementState,
        });
    }

    //Update blocks state when blocks are updated from outside
    useEffect(() => {
        setGridState(projectData.blocks);
    }, [projectData.blocks]);

    //Update objects state when objects are updated from outside
    useEffect(() => {
        setObstaclePlacementState(projectData.objects);
    }, [projectData.objects]);

    useEffect(() => {
        const satImage = new Image();
        satImage.onload = evt => {
            setImage({width: evt.target.width, height: evt.target.height})
        }
        satImage.src = projectData.satImageUrl;
    }, [projectData.satImageUrl]);

    return (
        <StageWrapper>
            <StageContent zoom={zoomLevel} rotation={rotation}>
                {
                    projectData.satImageUrl &&
                    <img alt="Roof" src={projectData.satImageUrl} />
                }
                {
                    projectData?.roof?.length > 0 &&
                    <SiteCanvas
                        width={image.width}
                        height={image.height}
                        coordinates={projectData.roof}
                    />
                }

                <SiteElementsGrid
                    onClick={handleGridClick}
                    width={image.width}
                    height={image.height}
                    blocks={gridState}
                    blockOrientation={projectData.blockOrientation}
                    gridOpacity={gridOpacity}
                    isDisabled={step !== appSteps.BLOCKS}
                />

                <SiteObstaclesPlacement
                    onClick={handlePlaceObstacle}
                    width={image.width}
                    height={image.height}
                    obstacles={obstaclePlacementState}
                    isDisabled={step !== appSteps.OBJECTS}
                />
            </StageContent>
        </StageWrapper>
    )
}

export default Stage;

