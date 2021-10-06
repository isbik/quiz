import React, { FC, useState } from "react";
import { Layout, LogOut } from "react-feather";
import styled from "styled-components";
import { Button, Card } from "../../ui";
import Link from "./../../components/Link";

const Avatar = styled.div`
  margin-left: 20px;
  margin-right: 10px;
  width: 100px;
  height: 100px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.accent};
`;
const MenuLink = styled(Link)`
  padding-right: 10px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

interface Props { }

enum Types {
  post,
  quiz,
  testing,
}

const Profile: FC<Props> = (props) => {
  const [active, setActive] = useState<Types>(Types.post);

  return (
    <div className="container">
      <Card className="mb-4" blur>
        <div
          className="d-flex align-center"
          style={{ top: 30, position: "relative" }}
        >
          <Avatar />
          <p className="m-0" style={{ marginRight: 'auto' }}>Inav Dudnev</p>
          <MenuLink href="/settings">
            <Layout />
          </MenuLink>
          <MenuLink href="/auth">
            <LogOut />
          </MenuLink>
        </div>
      </Card>

      <div className="d-flex gap-10">
        <Button
          onClick={() => setActive(Types.post)}
          color={active !== Types.post ? "primary" : "accent"}
        >
          Записи
        </Button>
        <Button
          onClick={() => setActive(Types.quiz)}
          color={active !== Types.quiz ? "primary" : "accent"}
        >
          Опросы
        </Button>
        <Button
          onClick={() => setActive(Types.testing)}
          color={active !== Types.testing ? "primary" : "accent"}
        >
          Тестирование
        </Button>
      </div>
    </div>
  );
};

export default Profile;
