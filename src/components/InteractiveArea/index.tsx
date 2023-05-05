import { Container, TSide, BSide, PlayButton, FunctionalButtons, FunctionalButtonsArea, PlayButtonArea } from "./styles";
import playImg from '../../imgs/play.svg'
import { Notes } from "../Buttons";
import { HiArrowNarrowLeft } from "react-icons/hi"
import { IoMdReturnLeft } from "react-icons/io";

export const InteractiveArea = () => {
    return (
        <Container>
            <TSide>

            </TSide>
            <BSide>
                <PlayButtonArea>
                    <PlayButton>
                        <img src={playImg} />
                    </PlayButton>
                </PlayButtonArea>
                <Notes />
                <FunctionalButtonsArea>
                    <FunctionalButtons>
                        <button><HiArrowNarrowLeft /></button>
                        <button>9</button>
                        <button>Enter <IoMdReturnLeft size={25}/></button>
                    </FunctionalButtons>
                </FunctionalButtonsArea>
            </BSide>
        </Container>
    );
}