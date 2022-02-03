import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faExclamationCircle,
    faSatelliteDish,
    faSolarPanel,
    faSnowflake,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import LevelIcon from "./components/LevelIcon";

export const appSteps = {
    OBSTACLES: '/obstacles',
    BLOCKS: '/blocks',
};

export const ICON_SIZE = 16;

export const gridBlockTypes = {
    LEVEL_A: {
        id: 'level-a',
        name: 'Level A',
        color: '#ff8b96',
        icon: ({blockSize, text}) => <LevelIcon bgColor="#ff8b96" blockSize={blockSize}>{text}</LevelIcon>,
    },
    LEVEL_B: {
        id: 'level-b',
        name: 'Level B',
        color: '#00caff',
        icon: ({blockSize, text}) => <LevelIcon bgColor="#00caff" blockSize={blockSize}>{text}</LevelIcon>,
    },
    LEVEL_C: {
        id: 'level-c',
        name: 'Level C',
        color: '#00ce85',
        icon: ({blockSize, text}) => <LevelIcon bgColor="#00ce85" blockSize={blockSize}>{text}</LevelIcon>,
    },
    LEVEL_D: {
        id: 'level-d',
        name: 'Level D',
        color: '#ffda35',
        icon: ({blockSize, text}) => <LevelIcon bgColor="#ffda35" blockSize={blockSize}>{text}</LevelIcon>,
    },
    SHAPE_DIRECTION_WEST: {
        id: 'shape-direction-west',
        name: 'Shape West',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleLeft} />,

    },
    SHAPE_DIRECTION_EAST: {
        id: 'shape-direction-east',
        name: 'Shape East',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleRight} />,
    },
    SHAPE_DIRECTION_NORTH: {
        id:  'shape-direction-north',
        name: 'Shape North',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleUp} />,
    },
    SHAPE_DIRECTION_SOUTH: {
        id:  'shape-direction-south',
        name: 'Shape South',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleDown} />,
    },
    BLOCKED: {
        id:  'blocked',
        name: 'Blocked',
        color: '',
        icon: <FontAwesomeIcon icon={faTimes} />,
    },
    OBSTACLE_BOILER_S: {
        id:  'obstacle-boiler-s',
        name: 'Small Boiler',
        color: '',
        icon: <FontAwesomeIcon size="xs" icon={faSolarPanel} />,
    },
    OBSTACLE_BOILER_M: {
        id:  'obstacle-boiler-m',
        name: 'Medium Boiler',
        color: '',
        icon: <FontAwesomeIcon size="sm" icon={faSolarPanel} />,
    },
    OBSTACLE_BOILER_L: {
        id:  'obstacle-boiler-l',
        name: 'Large Boiler',
        color: '',
        icon: <FontAwesomeIcon size="lg" icon={faSolarPanel} />,
    },
    OBSTACLE_AC_S: {
        id:  'obstacle-ac-s',
        name: 'Small A/C',
        color: '',
        icon: <FontAwesomeIcon size="xs" icon={faSnowflake} />,
    },
    OBSTACLE_AC_M: {
        id:  'obstacle-ac-m',
        name: 'Medium A/C',
        color: '',
        icon: <FontAwesomeIcon size="sm" icon={faSnowflake} />,
    },
    OBSTACLE_AC_L: {
        id:  'obstacle-ac-l',
        name: 'Large A/C',
        color: '',
        icon: <FontAwesomeIcon size="lg" icon={faSnowflake} />,
    },
    OBSTACLE_ANTENNA: {
        id:  'obstacle-antenna',
        name: 'Antenna',
        color: '',
        icon: <FontAwesomeIcon icon={faSatelliteDish} />,
    },
    OBSTACLE_OTHER: {
        id:  'obstacle-other',
        name: 'Other Obstacle',
        color: '',
        icon: <FontAwesomeIcon icon={faExclamationCircle} />,
    },
}

export const toolbarItemsMap = {
    [appSteps.OBSTACLES]: [
        gridBlockTypes.OBSTACLE_OTHER,
        gridBlockTypes.OBSTACLE_AC_S,
        gridBlockTypes.OBSTACLE_AC_M,
        gridBlockTypes.OBSTACLE_AC_L,
        gridBlockTypes.OBSTACLE_BOILER_S,
        gridBlockTypes.OBSTACLE_BOILER_M,
        gridBlockTypes.OBSTACLE_BOILER_L,
        gridBlockTypes.OBSTACLE_ANTENNA,
    ],
    [appSteps.BLOCKS]: [
        gridBlockTypes.LEVEL_A,
        gridBlockTypes.LEVEL_B,
        gridBlockTypes.LEVEL_C,
        gridBlockTypes.LEVEL_D,
        gridBlockTypes.SHAPE_DIRECTION_EAST,
        gridBlockTypes.SHAPE_DIRECTION_WEST,
        gridBlockTypes.SHAPE_DIRECTION_NORTH,
        gridBlockTypes.SHAPE_DIRECTION_SOUTH,
        gridBlockTypes.BLOCKED,
    ]

}
