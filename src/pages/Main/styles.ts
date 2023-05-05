import styled from 'styled-components'

type ImageType = {
  imgUrl: string
}

export const Container = styled.main<ImageType>`
  height: 100vh;
  background-image: url(${(props) => props.imgUrl});
  background-position: center;
  background-size: cover;
`;

export const ContainerBg = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
