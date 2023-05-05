import styled from 'styled-components'
import { IoPlay } from 'react-icons/io5'

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AcertometroBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
  width: 26%;
  border-radius: 50px;
  background-color: #534657;
  box-shadow: rgba(0, 0, 0, 0.5) 15px 15px 50px 5px inset,
    rgba(0, 0, 0, 0.3) -5px -5px 50px 5px inset;
`

export const AcertometroGradient = styled.div`
  border-radius: 30px;
  height: 94%;
  width: 70%;
  background: linear-gradient(to top, #fb037a, #6e49d7, #00fec1);
`

export const Indicator = styled(IoPlay)`
  transform: rotate(-180deg);
  fill: #0fa;
`
