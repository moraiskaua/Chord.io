import styled from 'styled-components'

export const Container = styled.header`
  height: 17%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LeftIcons = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 2.125rem;
`

export const Title = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: -2.125rem;

  h1 {
    font-size: 90px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.purple};
  }
`
