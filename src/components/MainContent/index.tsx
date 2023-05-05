import { Acertometro } from "../Acertometro";
import { Container, LSide, RSide, AcertometroTitle, AcertometroBox } from "./styles";

export const MainContent = () => {

    return (
        <Container>
            <LSide>

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

