import { CSSProperties, ReactEventHandler } from "react";
import React, { FC } from "react";
import { X } from "react-feather";
import styled from "styled-components";
import theme from "../styles/theme";

const TYPES = {
  primary: theme.colors.primary.main,
  success: theme.colors.success,
  error: theme.colors.error,
  danger: theme.colors.danger,
};

interface Props {
  icon?: React.ReactNode;
  type?: string;
  title: string;
  subtitle: string;
  showClose?: boolean;
  onClose?: ReactEventHandler;
  style: CSSProperties;
}

const Wrapper = styled.div<{ type?: any }>`
  width: 320px;

  position: fixed;
  bottom: 10px;
  right: 10px;

  background-color: ${({ type }) => TYPES[type] || TYPES["primary"]};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius};

  transition: all 0.2s;

  box-shadow: 0px 0px 10px rgba(64, 64, 64, 0.8);

  @media screen and (max-width: 500px) {
    border-radius: ${({ theme }) => `${theme.radius} ${theme.radius} 0px 0px`};
    width: 100%;
    bottom: 0;
    right: 0;
  }
`;

const Title = styled.p`
  margin-bottom: 2px;
  margin-top: 2px;
  font-size: 18px;
  line-height: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

const SubTitle = styled.p`
  margin: 0px;
  font-size: 10px;
  line-height: 12px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white + "99"};
`;

const ToastIcon = styled.div`
  min-width: 45px;
  height: 45px;

  border-radius: ${({ theme }) => theme.radius};

  background-color: ${({ theme }) => theme.colors.white + "88"};
`;

const Toast: FC<Props> = ({ type, title, subtitle, icon, onClose, style }) => {
  return (
    <Wrapper style={style} type={type} className="p-1 d-flex align-center">
      {icon ? (
        <ToastIcon className="d-flex align-center justify-center mr-1">
          {icon}
        </ToastIcon>
      ) : (
        <div className="mr-1" />
      )}
      <div className="flex-grow">
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </div>
      <X className="m-1 mb-0 mt-0 pointer" onClick={onClose} />
    </Wrapper>
  );
};

export default Toast;
