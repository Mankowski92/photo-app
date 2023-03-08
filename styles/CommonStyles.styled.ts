import styled from "styled-components";

export const Button = styled.button`
  background-color: #0080ff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  margin-right: 10px;
  width: fit-content;
  margin-top: 0.5rem;

  &:hover {
    background-color: #0066cc;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ButtonWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
