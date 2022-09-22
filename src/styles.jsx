import styled from 'styled-components';

export const Slate = styled.div`
    color: #3784db;

`;

export const Container = styled.div`
    margin-top: 5%;
    border-radius: 5px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 8%;
    margin-left: 8%;
    border: 1px solid #3784db;

`;

export const Title = styled.h1`
   @media (max-width: 768px) {
    font-size: 22px;
    padding: 0px 10px 0px 10px;
  }
    color: #3784db;

`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.div`
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 5px ;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

    &:hover {
      background: #000000;
      transform: translateY(-2px);
    }

`;


