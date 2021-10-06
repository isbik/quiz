import styled from "styled-components";

const StyledTextarea = styled.textarea<{ resize?: boolean }>`
  border: none;
  width: 100%;
  padding: 10px;

  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius};

  resize: ${({ resize }) => resize || "none"};
`;

export default function Textarea(props) {
  return <StyledTextarea {...props} />;
}
