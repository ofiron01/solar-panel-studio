import {gridBlockTypes} from "../constants";
import styled from 'styled-components';

const GridWrapper = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  opacity: ${props => props.isDisabled ? 0 : props.opacity / 100};
  z-index: ${({isDisabled}) => isDisabled ? 0 : 1};
`;

const BlockWrapper = styled.div`
    position: absolute;
    border: 1px solid #f1f1f1;
    font-size: 10px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    font-family: Arial, sans-serif;
    text-transform: capitalize;
    line-height: 1.5;
    transform-origin: top left;
    left: ${props => props.leftPosition}px;
    top: ${props => props.topPosition}px;
    width: ${props => props.size.width}px;
    height: ${props => props.size.height}px;
    transform: rotate(${props => props.rotation}deg);
    box-sizing: border-box;
`;

const mapBlockTypeToIcon = (type, blockSize, text) => {
    const trimmedBlockSize = {
        width: blockSize.width > 2  ? blockSize.width - 2 : blockSize.width,
        height: blockSize.height > 2 ? blockSize.height - 2 : blockSize.height,
    }
    console.log(trimmedBlockSize);
    switch (type) {
        case gridBlockTypes.BLOCKED.id:
            return gridBlockTypes.BLOCKED.icon;
        case gridBlockTypes.LEVEL_A.id:
            return gridBlockTypes.LEVEL_A.icon({blockSize: trimmedBlockSize, text});
        case gridBlockTypes.LEVEL_B.id:
            return gridBlockTypes.LEVEL_B.icon({blockSize: trimmedBlockSize, text});
        case gridBlockTypes.LEVEL_C.id:
            return gridBlockTypes.LEVEL_C.icon({blockSize: trimmedBlockSize, text});
        case gridBlockTypes.LEVEL_D.id:
            return gridBlockTypes.LEVEL_D.icon({blockSize: trimmedBlockSize, text});
        case gridBlockTypes.SHAPE_DIRECTION_WEST.id:
            return gridBlockTypes.SHAPE_DIRECTION_WEST.icon;
        case gridBlockTypes.SHAPE_DIRECTION_EAST.id:
            return gridBlockTypes.SHAPE_DIRECTION_EAST.icon;
        case gridBlockTypes.SHAPE_DIRECTION_NORTH.id:
            return gridBlockTypes.SHAPE_DIRECTION_NORTH.icon;
        case gridBlockTypes.SHAPE_DIRECTION_SOUTH.id:
            return gridBlockTypes.SHAPE_DIRECTION_SOUTH.icon;
        default:
            return <div />;
    }
}

function SiteElementsGrid({width, height, blocks, onClick, gridOpacity, blockOrientation, isDisabled}) {

    return <GridWrapper
        width={width}
        height={height}
        opacity={gridOpacity}
        isDisabled={isDisabled}
        onClick={evt => {
            if (isDisabled) {
            return;
        }
            onClick(evt);
        }}>
        {
            blocks.map((block, index) => {
                const [x, y, width, height, type] = block;
                const levelName = type?.split('-')[1] ?? ''
                return (
                    <BlockWrapper
                        data-blockid={index}
                        key={index}
                        rotation={blockOrientation}
                        leftPosition={x}
                        topPosition={y}
                        size={{width, height}}>
                        {
                            mapBlockTypeToIcon(type, {width, height}, levelName)
                        }
                    </BlockWrapper>
                );
            })
        }
    </GridWrapper>
}

export default SiteElementsGrid;
