import { Container, ContainerBg } from './styles';
import cimentoBg from '../../imgs/textura-cimento.png';
import { Header } from '../../components/Header';
import { MainContent } from '../../components/MainContent';

const Main = () => {
  return (
    <Container imgUrl={cimentoBg}>
      <ContainerBg>
        <Header />
        <MainContent/>
      </ContainerBg>
    </Container >
  )
}

export default Main;