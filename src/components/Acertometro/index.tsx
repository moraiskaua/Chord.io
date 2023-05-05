import { Container, AcertometroBorder, AcertometroGradient, Indicator } from "./styles";

export const Acertometro = () => {
    return (
        <Container>
            <AcertometroBorder>
                <AcertometroGradient />
            </AcertometroBorder>
            <Indicator size={70}/>
        </Container>
    );
}