import { Acertometro } from "../Acertometro";
import { InteractiveArea } from "../InteractiveArea";
import { Container, LSide, RSide, AcertometroTitle, AcertometroBox } from "./styles";

export const MainContent = () => {

    return (
        <Container>
            <LSide>
                <InteractiveArea />
            </LSide>
            <RSide>
                <AcertometroTitle>
                    <h4>Are you close?</h4>
                </AcertometroTitle>
                <AcertometroBox>
                    <Acertometro />
                </AcertometroBox>
            </RSide>
        </Container>
    );
}

