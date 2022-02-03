import {useEffect, useState} from "react";
import styled from 'styled-components';

const CanvasWrapper = styled.div`
    position: absolute;
    z-index: 0;
`;

const SiteCanvasSvg = styled.svg`
    fill: transparent;
    stroke: #19ffc2;
    stroke-width: 3;
`;

function SiteCanvas({width, height, coordinates}) {
    const [path, setPath] = useState('');
    useEffect(() => {
        const svgPath = coordinates.reduce((result, value, index, array) => {
            if (index % 2 === 0)
                result += `L${array[index]},${array[index+1]}`
            return result;
        }, []);

        setPath(svgPath);
    }, [coordinates]);

    return (
        <CanvasWrapper>
            <SiteCanvasSvg
                width={width}
                height={height}
                viewBox="0 0 370 370"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={`m${coordinates[0]},${coordinates[1]} ${path} z`}/>
            </SiteCanvasSvg>
        </CanvasWrapper>
    );
}

export default SiteCanvas;
