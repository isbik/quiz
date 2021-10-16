import React, { FC, useState } from "react";
import styled from "styled-components";
import Button from "./../ui/Button";

interface Props {}

const Wrapper = styled.div`
  width: 100%;

  padding: 10px;
  padding-bottom: 50px;

  border: none;
  outline: none;

  color: ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.white};

  font-size: 1.3em;
  letter-spacing: 1px;

  resize: none;

  &:disabled {
    opacity: 0.7;
  }

  &[contenteditable][placeholder]:empty:before {
    content: attr(placeholder);
    color: gray;
  }
`;

const EditorWrapper = styled.div`
  position: relative;
`;

const Actions = styled.div`
  position: absolute;

  bottom: 10px;
  left: 10px;
`;

const Editor: FC<Props & any> = (props) => {
  const [commands, setCommands] = useState([]);
  function applyCommand(command) {
    if (commands.includes(command)) {
      setCommands((prev) => prev.filter((c) => c !== command));
    } else {
      setCommands((prev) => [...prev, command]);
    }
    document.execCommand(command);
  }

  return (
    <EditorWrapper>
      <Wrapper contentEditable {...props}></Wrapper>
      <Actions>
        <Button
          flat={!commands.includes("bold")}
          onClick={() => applyCommand("bold")}
          width="30px"
          height="30px"
          className="mr-1 weight-bold"
        >
          B
        </Button>
        <Button
          flat={!commands.includes("italic")}
          onClick={() => applyCommand("italic")}
          width="30px"
          className="mr-1"
          height="30px"
          style={{ fontStyle: "italic" }}
        >
          I
        </Button>
        <Button
          flat={!commands.includes("underline")}
          onClick={() => applyCommand("underline")}
          width="30px"
          height="30px"
          style={{ textDecoration: "underline" }}
        >
          U
        </Button>
      </Actions>
    </EditorWrapper>
  );
};

export default Editor;
