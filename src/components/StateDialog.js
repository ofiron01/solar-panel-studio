import styled from "styled-components";
import {useEffect, useState} from "react";

const Dialog = styled.dialog`
  position: fixed;
  width: 80%;
  height: 50vh;
  top: 20%;
  border: 1px solid #3d3d3d;
  background-color: rgba(255,255,255,0.75);
  box-shadow:5px 5px 5px rgba(0,0,0,0.4);
  border-radius: 5px;
  p, label {
    height: 88%;
    display: block;
  }
`;

const StateTextArea = styled.textarea`
  width: 100%;
  min-height: 100%;
  resize: vertical;
  background-color: #3d3d3d;
  color: #d1d1d1;
  font-weight: bold;
  font-size: 16px;
`

function StateDialog({isOpen, projectState, onApply, onClose}) {
    const [data, setData] = useState(JSON.stringify(projectState, undefined, 4));
    const handleApply = () => {
        try {
            onApply(JSON.parse(data));
        } catch (err) {
            return;
        }
    }

    //Update textarea value on each project state change
    useEffect(() => {
        setData(JSON.stringify(projectState, undefined, 4));
    }, [projectState]);

    return (
        <Dialog open={isOpen}>
            <p>
                <label style={{display: 'block'}}>
                    <strong>Project data</strong>
                    <StateTextArea
                        value={data}
                        onChange={evt => setData(evt.target.value)}
                    />
                </label>
            </p>
            <menu>
                <button onClick={onClose}>Close</button>
                <button onClick={handleApply}>Apply</button>
            </menu>
        </Dialog>
    )
}

export default StateDialog;
