import styled from "styled-components";

export const NotesGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: .6rem 0;

    button {
        height: 4.3rem;
        width: 4.3rem;
        border: none;
        background-color: #C47BFD;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #231C24;
        border-radius: 15px;
        font-size: 24px;
        font-weight: 600;

        &:focus {
            outline: none;
        }
    }
`