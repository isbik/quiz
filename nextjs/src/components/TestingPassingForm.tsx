import React, { FC, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { Button, Card } from "../ui";
import Link from "./Link";
import { confetti } from "./../utils/runConfitti";
import TestingResults from "./TestingResults";

const TestingHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius};
`;

const Progress = styled.div<{ procent: number }>`
  min-height: 20px;

  flex-grow: 1;

  position: relative;

  border-radius: ${({ theme }) => theme.radius};

  z-index: 0;

  text-align: right;

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary.main};
  padding: 0 5px;

  font-size: 12px;
  line-height: 20px;
  font-weight: bold;

  &::after {
    position: absolute;
    content: " ";

    z-index: -1;
    left: 0;

    height: 100%;
    width: ${({ procent }) => procent + "%"};

    background-color: ${({ theme }) => theme.colors.success};

    border-radius: ${({ theme }) => theme.radius};
  }
`;

const Timer = styled.div`
  height: 20px;

  font-size: 12px;
  line-height: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 4px;

  border-radius: ${({ theme }) => theme.radius};

  background-color: ${({ theme }) => theme.colors.error};
`;

const TestingWrapper = styled(Card)`
  overflow: "auto";
  border-radius: ${({ theme }) => theme.radius};

  width: 90vw;
  max-width: 600px;

  background-color: ${({ theme }) => theme.colors.primary.light};
`;

const Question = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: -40px;

  font-size: 24px;
  line-height: 28px;

  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.primary.main};

  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
`;

const TestingAnswer = styled.div<{ type?: string; hoverable: boolean }>`
  cursor: pointer;
  padding: 10px;

  background-color: ${({ theme, type }) =>
    type === "success"
      ? theme.colors.success
      : type === "error"
      ? theme.colors.danger
      : theme.colors.white};

  color: ${({ theme, type }) =>
    type !== "" ? theme.colors.white : theme.colors.primary.main};

  border-radius: ${({ theme }) => theme.radius};

  font-size: 18px;
  line-height: 21px;

  transition: 0.3s all;

  ${({ hoverable }) =>
    hoverable &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.white};
      }
    `};
`;

interface Props {}

const TestingPassingForm: FC<Props & any> = ({ testing }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionAnswerMeta, setQuestionAnswerMeta] = useState({
    is_correct: false,
    id: null,
  });
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [isFinish, setIsFinish] = useState(false);

  const currentQuestion = useMemo(() => {
    return testing.questions[questionIndex];
  }, [questionIndex, testing]);

  const procentPassing = useMemo(() => {
    return Math.floor((100 / testing.questions.length) * (questionIndex + 1));
  }, [questionIndex, testing]);

  const handlerAnswer = (e, id) => {
    if (questionAnswerMeta.id) return;

    setQuestionAnswerMeta(() => {
      const params = { id, is_correct: Math.random() > 0.5 };

      if (params.is_correct) {
        setCorrectAnswers((prev) => prev + 1);
        confetti(e.target);
      }
      return params;
    });

    setTimeout(() => {
      setQuestionIndex((prev) => {
        const hasMoreQuestions = prev >= testing.questions.length - 1;
        if (hasMoreQuestions) setIsFinish(true);
        return hasMoreQuestions ? 0 : prev + 1;
      });

      setQuestionAnswerMeta({ id: null, is_correct: false });
    }, 700);
  };

  return (
    <TestingWrapper>
      {isFinish ? (
        <TestingResults
          name={testing.name}
          total={testing.questions.length}
          correct={correctAnswers}
        />
      ) : (
        <>
          <TestingHeader className="p-2 mb-2">
            <p className="m-0 mb-1">{testing.name}</p>
            <div className="d-flex align-center">
              <Progress className="mr-1" procent={procentPassing}>
                {procentPassing}%
              </Progress>
              <Timer>12:12</Timer>
            </div>
            <Question className="p-2">{currentQuestion.name}</Question>
          </TestingHeader>

          <div className="p-2">
            {currentQuestion.variants.map(({ id, name }) => (
              <TestingAnswer
                onClick={(e) => handlerAnswer(e, id)}
                hoverable={questionAnswerMeta.id === null}
                type={
                  id === questionAnswerMeta.id
                    ? questionAnswerMeta.is_correct
                      ? "success"
                      : "error"
                    : ""
                }
                key={id}
                className="mb-2"
              >
                {name}
              </TestingAnswer>
            ))}

            <div className="d-flex justify-between">
              <Link href="/">
                <Button flat>Отменить</Button>
              </Link>
              {/* <Button>Далее</Button> */}
            </div>
          </div>
        </>
      )}
    </TestingWrapper>
  );
};

export default TestingPassingForm;
