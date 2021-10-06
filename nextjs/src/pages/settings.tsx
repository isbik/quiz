import { useStore } from "effector-react";
import React from "react";
import styled from "styled-components";
import { Card } from "../ui";
import Input from "./../ui/Input";
import { $themeStore } from "../effector/theme-state";
import { setTheme } from "./../effector/theme-state";
interface Props {}

const colors = ["#26baee", "#8f71ff", "#303481", "#fc8a15", "#ff0592"];

const ColorTile = styled.div<{ color: string; active: boolean }>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ color, active }) => (active ? "transparent" : color)};
  border: 1px solid ${({ color, active }) => (active ? color : "transparent")};
`;

const Settings = (props) => {
  const themeStore = useStore($themeStore);
  return (
    <div className="container">
      <Card blur className="p-2">
        <h1>Настройки</h1>
        <div className="mb-2 d-flex align-center">
          <p style={{ margin: 0, marginRight: 10 }}>Размер сгругления</p>
          <Input
            onChange={(e) => setTheme({ radius: e.target.value })}
            value={themeStore.radius}
            placeholder="Значение в px"
          />
        </div>

        {/* <div className="d-flex gap-10 justify-between flex-wrap">
          <div className="d-flex flex-column mb-2">
            <p style={{ marginBottom: 10, marginTop: 0 }}>Основной цвет</p>
            <div className="d-flex gap-10">
              {colors.map((color) => (
                <ColorTile
                  onClick={() =>
                    setTheme({ colors: { primary: { main: color } } })
                  }
                  active={themeStore?.colors?.primary?.main === color}
                  key={color}
                  color={color}
                />
              ))}
            </div>
          </div>
          <div className="d-flex flex-column">
            <p style={{ marginBottom: 10, marginTop: 0 }}>
              Дополнительный цвет
            </p>
            <div className="d-flex gap-10">
              {colors.map((color) => (
                <ColorTile
                  active={themeStore?.colors?.accent === color}
                  onClick={() => setTheme({ colors: { accent: color } })}
                  key={color}
                  color={color}
                />
              ))}
            </div>
          </div> */}
        {/* </div> */}
      </Card>
    </div>
  );
};

export default Settings;
