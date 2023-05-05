import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const TSide = styled.div`
    flex: 3;
`

export const BSide = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
`

export const PlayButtonArea = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 1.5rem 0 1rem;
`

export const PlayButton = styled.button`
    height: 9rem;
    width: 9rem;
    background-color: #C47BFD;
    border: none;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 40%;
    }
`

export const FunctionalButtonsArea = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 1.5rem 0 -.4rem;
`

export const FunctionalButtons = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 4.3rem);
    gap: .6rem;

    button {
        width: 100%;
        height: 4.3rem;
        text-transform: uppercase;
        background-color: transparent;
        border: 3px solid #C47BFD;
        border-radius: 20px;
        font-size: 24px;
        color: #C47BFD;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .6rem;
        outline: none;

        &:focus {
            outline: none;
        }

        &:first-child {
            grid-column-start: 1;
            grid-column-end: 3;
        }

        &:nth-child(2) {
            height: 4.3rem;
            width: 4.3rem;
            background-color: #C47BFD;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #231C24;
            border-radius: 15px;
            font-weight: 600;
        }

        &:last-child {
            font-size: 12px;
            background-color: #8C52B9;
            color: #FCF4FF;
            border: 3px solid #C47BFD;
            gap: 1rem;
        }
    }
`