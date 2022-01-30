import styled from 'styled-components';
import Grid from "./Grid";
import {useEffect, useState} from "react";
import SiteCanvas from "./SiteCanvas";

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

function Stage({projectData, zoomLevel, gridOpacity, blockToolSelected, rotation}) {

    const [gridState, setGridState] = useState(projectData.blocks);
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
                <Grid
                    onClick={evt => handleGridClick(evt)}
                    width={image.width}
                    height={image.height}
                    blocks={gridState}
                    blockSize={projectData.blockSize}
                    orientation={projectData.orientation}
                    gridOpacity={gridOpacity}
                />

            </StageContent>
        </StageWrapper>
    )
}

export default Stage;

