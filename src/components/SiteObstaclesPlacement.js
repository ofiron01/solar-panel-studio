import styled from "styled-components";
import {gridBlockTypes, ICON_SIZE} from "../constants";

const Wrapper = styled.div`
  position: absolute;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  z-index: ${({isDisabled}) => isDisabled ? 0 : 1};
  opacity: ${({isDisabled}) => isDisabled ? 0.4 : 1};
`;

const ObstacleWrapper = styled.div`
  position: absolute;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  background-color: rgba(255,255,255,0);
  cursor: pointer;
`

const mapObjectTypeToIcon = (type) => {
    switch (type) {
        case gridBlockTypes.OBSTACLE_BOILER_S.id:
            return gridBlockTypes.OBSTACLE_BOILER_S.icon;
        case gridBlockTypes.OBSTACLE_BOILER_M.id:
            return gridBlockTypes.OBSTACLE_BOILER_M.icon;
        case gridBlockTypes.OBSTACLE_BOILER_L.id:
            return gridBlockTypes.OBSTACLE_BOILER_L.icon;
        case gridBlockTypes.OBSTACLE_AC_S.id:
            return gridBlockTypes.OBSTACLE_AC_S.icon;
        case gridBlockTypes.OBSTACLE_AC_M.id:
            return gridBlockTypes.OBSTACLE_AC_M.icon;
        case gridBlockTypes.OBSTACLE_AC_L.id:
            return gridBlockTypes.OBSTACLE_AC_L.icon;
        case gridBlockTypes.OBSTACLE_ANTENNA.id:
            return gridBlockTypes.OBSTACLE_ANTENNA.icon;
        case gridBlockTypes.OBSTACLE_OTHER.id:
            return gridBlockTypes.OBSTACLE_OTHER.icon;
        default:
            return <div />;
    }
}

function SiteObstaclesPlacement({width, height, obstacles, onClick, isDisabled}) {

    return (
        <Wrapper
            data-id="obstaclesWrapper"
            width={width}
            height={height}
            isDisabled={isDisabled}
            onClick={evt => {
                if (isDisabled) {
                    return;
                }
                onClick(evt);
            }}
        >
            {
                obstacles.map((obstacle) => {
                    const [x, y, label, id] = obstacle;
                    return <ObstacleWrapper
                        key={`${label}_${x}_${y}`}
                        data-id={id}
                        //Offset icon position to center based on its size
                        left={x - ICON_SIZE/2}
                        top={y - ICON_SIZE/2}
                    >
                        {
                            mapObjectTypeToIcon(label)
                        }
                    </ObstacleWrapper>;
                })
            }
        </Wrapper>
    )
}

export default SiteObstaclesPlacement;
