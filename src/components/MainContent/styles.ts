import styled from 'styled-components'

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.black};
  height: 80%;
  width: 97%;
  border-radius: 40px;
  display: flex;
  padding: 10px;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, .25);
`

export const LSide = styled.div`
  flex: 8;
  height: 100%;
`

export const RSide = styled.div`
  flex: 2;
  /* background-color: red; */
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
`

export const AcertometroTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    text-transform: uppercase;
    font-size: 25px;
    font-weight: bolder;
    font-family: 'Inter', sans-serif;
    background: -webkit-linear-gradient(${({theme}) => theme.colors.purple}, #161616);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const AcertometroBox = styled.div`
  border-radius: 30px;
  width: 90%;
  height: 87%;
  background-color: #251926;
  box-shadow: rgba(0, 0, 0, 0.4) 30px 20px 50px -5px inset,
    rgba(0, 0, 0, 0.4) -15px -10px 40px -18px inset;
`
