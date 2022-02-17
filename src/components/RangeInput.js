import styled from "styled-components";

const LabelWrapper = styled.label`
  padding: 5px;
`

function RangeInput({label, value, onChange, min, max, step = 1, style = {width: 150}}) {
    return (
        <label style={style}>
            <LabelWrapper>
                {label}
            </LabelWrapper>
            <input
                type="range"
                value={value}
                onChange={evt => onChange(parseInt(evt.target.value))}
                min={min}
                max={max}
                step={step}
            />
        </label>

    );
}

export default RangeInput;
