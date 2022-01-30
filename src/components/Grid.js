import {gridBlockTypes} from "../constants";
import styled from 'styled-components';

const GridWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  opacity: ${props => props.opacity / 100};
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
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    transform: rotate(${props => props.rotation}deg);
`;

const mapTypeToStyle = (type, blockSize, text) => {
    switch (type) {
        case gridBlockTypes.LEVEL_A.id:
            return gridBlockTypes.LEVEL_A.icon({blockSize, text});
        case gridBlockTypes.LEVEL_B.id:
            return gridBlockTypes.LEVEL_B.icon({blockSize, text});
        case gridBlockTypes.SHAPE_DIRECTION_LEFT.id:
            return gridBlockTypes.SHAPE_DIRECTION_LEFT.icon;
        case gridBlockTypes.SHAPE_DIRECTION_RIGHT.id:
            return gridBlockTypes.SHAPE_DIRECTION_RIGHT.icon;
        case gridBlockTypes.SHAPE_DIRECTION_TOP.id:
            return gridBlockTypes.SHAPE_DIRECTION_TOP.icon;
        case gridBlockTypes.SHAPE_DIRECTION_BOTTOM.id:
            return gridBlockTypes.SHAPE_DIRECTION_BOTTOM.icon;
        case gridBlockTypes.OBSTACLE_BOILER.id:
            return gridBlockTypes.OBSTACLE_BOILER.icon;
        case gridBlockTypes.OBSTACLE_AC.id:
            return gridBlockTypes.OBSTACLE_AC.icon;
        case gridBlockTypes.OBSTACLE_OTHER.id:
            return gridBlockTypes.OBSTACLE_OTHER.icon;
        default:
            return <div />;
    }
}

function Grid({width, height, blocks, blockSize, onClick, gridOpacity, orientation}) {

    return <GridWrapper
        width={width}
        height={height}
        opacity={gridOpacity}
        onClick={onClick}>
        {
            blocks.map((block, index) => {
                const [x, y, label, type] = block;
                const levelName = type?.split('-')[1] ?? ''
                return (
                    <BlockWrapper
                        data-blockid={index}
                        key={index}
                        title={label}
                        rotation={orientation}
                        leftPosition={x}
                        topPosition={y}
                        size={blockSize}>
                        {
                            mapTypeToStyle(type, blockSize, levelName)
                        }
                    </BlockWrapper>
                );
            })
        }
    </GridWrapper>
}

export default Grid;
