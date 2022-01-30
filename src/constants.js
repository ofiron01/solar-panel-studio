import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faExclamationCircle, faFan,
    faSun
} from '@fortawesome/free-solid-svg-icons'
import LevelIcon from "./components/LevelIcon";



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
    SHAPE_DIRECTION_LEFT: {
        id: 'shape-direction-left',
        name: 'Shape Left',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleLeft} />,

    },
    SHAPE_DIRECTION_RIGHT: {
        id: 'shape-direction-right',
        name: 'Shape Right',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleRight} />,
    },

    SHAPE_DIRECTION_TOP: {
        id:  'shape-direction-top',
        name: 'Shape Top',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleUp} />,
    },

    SHAPE_DIRECTION_BOTTOM: {
        id:  'shape-direction-bottom',
        name: 'Shape Bottom',
        color: '',
        icon: <FontAwesomeIcon icon={faAngleDown} />,
    },

    OBSTACLE_BOILER: {
        id:  'obstacle-boiler',
        name: 'Boiler Obstacle',
        color: '',
        icon: <FontAwesomeIcon icon={faSun} />,
    },

    OBSTACLE_AC: {
        id:  'obstacle-ac',
        name: 'A/C Obstacle',
        color: '',
        icon: <FontAwesomeIcon icon={faFan} />,
    },

    OBSTACLE_OTHER:{
        id:  'obstacle-other',
        name: 'Other Obstacle',
        color: '',
        icon: <FontAwesomeIcon icon={faExclamationCircle} />,
    },

}
