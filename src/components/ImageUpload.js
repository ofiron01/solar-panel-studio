import {useState} from "react";
import styled from "styled-components";
import SiteCanvas from "./SiteCanvas";
import {ToolButton} from "./Toolbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {appSteps} from "../constants";

const Wrapper = styled.div`
  margin-top: 150px;
  color: #ffffff;
`
const StageContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform-origin: center center;
    transition: 0.25s all;
    //margin-top: 100px;
    transform: ${({rotation, zoom}) => `rotate(${rotation}deg) scale(${zoom})`};
`;

const StyledImage = styled.img`
  z-index: 0;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Instructions = styled.div`
  padding: 20px;
  
  text-align: center;
`

const api = 'https://organuz.flamiingo.com/blocks.php';

function ImageUpload({handleDataChange}) {
    const [image, setImage] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [projectImage, setProjectImage] = useState(null);
    const [coordinates, setCoordinates] = useState([]);

    const navigate = useNavigate();

    const onOptimizeSuccess = (data) => {
        console.log(data);
        handleDataChange(data);
    }
    const handleClick = evt => {
        const x = evt.nativeEvent.offsetX;
        const y = evt.nativeEvent.offsetY;
        console.log(evt.nativeEvent.offsetX, evt.nativeEvent.offsetY);

        setCoordinates([
            ...coordinates,
            x,
            y,
        ])
    }

    const onSave = async () => {
        setIsSaving(true);
        try {
            const rawResponse = await fetch(api,
                {
                    method: "POST",
                    body: JSON.stringify({
                        image: projectImage,
                        "roof": coordinates,
                        "blockSize": 15,
                    })
                });
            const content = await rawResponse.json();
            onOptimizeSuccess(content);
            setIsSaving(false);
            navigate(appSteps.OBJECTS);
        } catch (e) {
            console.log(e);
            setIsSaving(false);
        }

    }

    const onClear = () => {
        setCoordinates([]);
    }

    const onUndo = () => {
        setCoordinates(coordinates.slice(0, -2))
    }

    const readURL = (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                setProjectImage(e.target.result);

                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    setImage(this)
                }
            };
            reader.readAsDataURL(evt.target.files[0]);
        }
    }

    return <Wrapper>
        <Instructions>
            Please upload an image and start selecting polygon vertices in clockwise order.<br/>
            When done, click save.
        </Instructions>
        {
            projectImage && image &&
                <StageContent>

                    <StyledImage onClick={handleClick} src={projectImage} />
                    {
                        coordinates.length > 0 &&
                        <SiteCanvas width={image.width} height={image.height} coordinates={coordinates}  />
                    }
                </StageContent>
        }
        <ButtonsWrapper>
            <input type="file" onChange={readURL} />

            <ToolButton disabled={coordinates.length < 2} onClick={onUndo}>Undo</ToolButton>
            <ToolButton disabled={coordinates.length < 2} onClick={onClear}>Clear</ToolButton>
            <ToolButton
                bgColor="#00caff"
                disabled={coordinates.length < 2}
                onClick={onSave}>{
                isSaving
                    ? <FontAwesomeIcon icon={faSpinner} />
                    : 'Save'
            }</ToolButton>
        </ButtonsWrapper>
    </Wrapper>
}

export default ImageUpload;
