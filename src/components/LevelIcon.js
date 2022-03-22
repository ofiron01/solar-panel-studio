
import styled from 'styled-components';

const LevelIcon = styled.div`
  background-color: ${props => props.bgColor};
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  line-height: ${props => props.height}px;
  font-size: ${props => props.height / 2 }px;
`

export default LevelIcon;
