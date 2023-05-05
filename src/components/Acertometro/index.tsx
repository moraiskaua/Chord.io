import { Container, AcertometroBorder, AcertometroGradient, Indicator, IndicatorArea } from "./styles";
import { indicator } from "../../helpers/indicator";

export const Acertometro = () => {

    return (
        <Container>
            <AcertometroBorder>
                <AcertometroGradient />
            </AcertometroBorder>
            <IndicatorArea>
                <Indicator size={70} indicator={indicator.top} />
            </IndicatorArea>
        </Container>
    );
}