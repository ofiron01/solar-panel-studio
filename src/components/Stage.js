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

function Stage({step, projectData, zoomLevel, gridOpacity, blockToolSelected, rotation}) {
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
                block[3] = blockToolSelected;
            }
            return block;
        })
        setGridState(newGridState);
    }

    const handlePlaceObstacle = evt => {
        // const rect = evt.target.getBoundingClientRect();
        // const x = evt.clientX - rect.left; //x position within the element.
        // const y = evt.clientY - rect.top;  //y position within the element.
        const x = evt.nativeEvent.offsetX;
        const y = evt.nativeEvent.offsetY;
        console.log(evt.nativeEvent.offsetX, evt.nativeEvent.offsetY)
        if (evt.target.dataset.id !== 'obstaclesWrapper') {
            console.log(evt.target.parentElement.parentElement.dataset.id, ' is not obstaclesWrapper, removing clicked item');
            const updatedObstaclePlacementState = obstaclePlacementState.filter(obstacle => {
                const [,,,id] = obstacle;
                return (
                    id !== parseInt(evt.target.parentElement.dataset.id) &&
                    id !== parseInt(evt.target.parentElement.parentElement.dataset.id)
                );
            })
            setObstaclePlacementState(updatedObstaclePlacementState);

        } else {
            setObstaclePlacementState(prevState => [
                ...prevState,
                [x, y, blockToolSelected, prevState.length]
            ]);
        }

    }

    useEffect(() => {
        const satImage = new Image();
        satImage.onload = evt => {
            setImage({width: evt.target.width, height: evt.target.height})
        }
        satImage.src = projectData.satImageUrl;
    }, []);

    return (
        <StageWrapper>
            <StageContent zoom={zoomLevel} rotation={rotation}>
                <img alt="Roof" src={projectData.satImageUrl} />
                <SiteCanvas
                    width={image.width}
                    height={image.height}
                    coordinates={projectData.roof}
                />

                <SiteElementsGrid
                    onClick={handleGridClick}
                    width={image.width}
                    height={image.height}
                    blocks={gridState}
                    blockSize={projectData.blockSize}
                    orientation={projectData.orientation}
                    gridOpacity={gridOpacity}
                    isDisabled={step !== appSteps.BLOCKS}
                />

                <SiteObstaclesPlacement
                    onClick={handlePlaceObstacle}
                    width={image.width}
                    height={image.height}
                    obstacles={obstaclePlacementState}
                    isDisabled={step !== appSteps.OBSTACLES}
                />
            </StageContent>
        </StageWrapper>
    )
}

export default Stage;

