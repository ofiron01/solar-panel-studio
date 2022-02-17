import styled from 'styled-components';
import {appSteps} from "../constants";
import RangeInput from "./RangeInput";
import {Link, useLocation} from "react-router-dom";
import {faChevronLeft, faChevronRight, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ToolbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 40px);
  background-color: rgba(255,255,255,0.75);
  box-shadow:5px 5px 5px rgba(0,0,0,0.4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToolbarRow = styled.div`
  padding: 5px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: ${({justify}) => justify ?? 'space-between'};
  flex-flow: row wrap;
  max-width: 980px;
  align-items: center;
`;

const ToolButton = styled.button`
  width: 80px;
  height: 40px;
  margin: 5px;
  cursor: ${({isSelected}) => isSelected ? 'default' : 'pointer'};
  color: ${({isSelected}) => isSelected ? '#000000' : '#999999'};
  background-color: ${({bgColor}) => bgColor !== '' ? bgColor : '#ffffff'};
  box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
  border-radius: 5px;
  border: ${({isSelected}) => isSelected ? '1px solid #313131' : 'none'};
`;

const StyledDisabledLink = styled.span`
  color: #3d3d3d;
  cursor: default;
`

const StyledLink = styled(Link)`
  color: #3d3d3d;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`

function NavLink(props) {
    const {pathname} = useLocation();
    if (pathname === props.to) {
        return <StyledDisabledLink>{props.children}</StyledDisabledLink>;
    }
    return <StyledLink {...props} />
}

function Toolbar({
     toolItems,
     stageZoom,
     setStageZoom,
     gridOpacity,
     setGridOpacity,
     blockToolSelected,
     setBlockToolSelected,
     stageRotation,
     setStageRotation,
     setIsModalVisible
 }) {
    return (
        <ToolbarWrapper>
            <ToolbarRow>
                    <RangeInput
                        label="Zoom"
                        value={stageZoom}
                        onChange={setStageZoom}
                        min={1}
                        max={10}
                        step={1}
                    />
                    <RangeInput
                        label="Opacity"
                        value={gridOpacity}
                        onChange={setGridOpacity}
                        min={0}
                        max={100}
                        step={10}
                    />
                    <RangeInput
                        label="Rotation"
                        value={stageRotation}
                        onChange={setStageRotation}
                        min={0}
                        max={360}
                        step={10}
                    />

                    <ToolButton onClick={() => setIsModalVisible(true)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </ToolButton>
                    <NavLink to={appSteps.OBJECTS}>
                        <FontAwesomeIcon icon={faChevronLeft} /> Objects
                    </NavLink>
                    <div>&nbsp;|&nbsp;</div>
                    <NavLink to={appSteps.BLOCKS}>
                        Blocks <FontAwesomeIcon icon={faChevronRight} />
                    </NavLink>
            </ToolbarRow>
            <ToolbarRow>
                {
                    toolItems.map(item => {
                        const Icon = typeof item.icon === 'function'
                            ? <span />
                            : item.icon;

                        return (
                            <ToolButton
                                key={item.id}
                                isSelected={blockToolSelected === item.id}
                                bgColor={item.color}
                                onClick={() => setBlockToolSelected(item.id)}
                            >
                                {Icon}{' '}{item.name}
                            </ToolButton>
                        )
                    })
                }
            </ToolbarRow>
        </ToolbarWrapper>
    )
}

export default Toolbar;
