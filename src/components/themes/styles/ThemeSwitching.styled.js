import styled from "styled-components";

export const ThemeContainer = styled.div`
  background-color: ${({ theme }) => theme.display};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.body};
`;

export const ThemeButton = styled.button`
  margin: 0 5px;
  padding: 10px;
  font-size: 0.5rem;
  border: 1px solid ${({ theme }) => theme.body};
  border-radius: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 2px ${({ theme }) => theme.display};
`;
