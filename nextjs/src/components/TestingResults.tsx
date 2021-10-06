import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { Button } from "../ui";
import Link from "./Link";

interface Props {
  name: string;
  total: number;
  correct: number;
}

const Title = styled.p`
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const CongratulationText = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.05em;

  color: ${({ theme }) => theme.colors.primary.main};
`;

const ResultText = styled.span<{ color: string }>`
  font-weight: bold;
  font-size: 20px;
  line-height: 16px;
  letter-spacing: -1px;

  color: ${({ theme, color }) => theme.colors[color]};
`;

const TestingResults: FC<Props> = ({ name, total, correct }) => {
  const colorResult = useMemo(() => {
    const procent = (100 / total) * correct;
    if (procent < 25) return "error";
    if (procent < 55) return "danger";
    return "success";
  }, [total, correct]);

  return (
    <div className="p-4 text-center">
      <Title className="mb-4">
        Вы завершили тестирование:
        <strong>{name}</strong>
      </Title>

      <CongratulationText>Поздравляем</CongratulationText>
      <p className="mb-4">
        Ваш результат:{" "}
        <ResultText color={colorResult}>
          {correct} из {total}
        </ResultText>
      </p>

      <div className="d-flex justify-between">
        <Button color="success">Поделиться</Button>
        <Link href="/">
          <Button>Главаная</Button>
        </Link>
      </div>
    </div>
  );
};

export default TestingResults;
