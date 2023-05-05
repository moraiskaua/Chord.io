import { Container, LeftIcons, Title } from "./styles"
import { AiFillSetting } from "react-icons/ai";
import { IoMdHelpCircle } from "react-icons/io";

export const Header = () => {
    return (
        <Container>
            <LeftIcons>
                <AiFillSetting color='#C47BFD' size={45} />
                <IoMdHelpCircle color='#C47BFD' size={45} />
            </LeftIcons>
            <Title>
                <h1>CHORD.IO</h1>
            </Title>
        </Container>
    );
}