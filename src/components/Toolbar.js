import styled from 'styled-components';
import {gridBlockTypes} from "../constants";
import RangeInput from "./RangeInput";

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
  border: ${({isSelected}) => isSelected ? '2px solid #313131' : 'none'};
`;

function Toolbar({
     stageZoom,
     setStageZoom,
     gridOpacity,
     setGridOpacity,
     blockToolSelected,
     setBlockToolSelected,
     stageRotation,
     setStageRotation
 }) {
    return (
        <ToolbarWrapper>
            <ToolbarRow justify="flex-start">
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
            </ToolbarRow>
            <ToolbarRow>
                {
                    Object.values(gridBlockTypes).map(blockType => {
                        const Icon = typeof blockType.icon === 'function'
                            ? <span />
                            : blockType.icon;

                        return (
                            <ToolButton
                                key={blockType.id}
                                isSelected={blockToolSelected === blockType.id}
                                bgColor={blockType.color}
                                onClick={() => setBlockToolSelected(blockType.id)}
                            >
                                {Icon}{' '}{blockType.name}
                            </ToolButton>
                        )
                    })
                }
            </ToolbarRow>
        </ToolbarWrapper>
    )
}

export default Toolbar;
