import React, { FC, useCallback, useState } from "react";
import { Check, Plus, X } from "react-feather";
import styled from "styled-components";
import { Button, Checkbox, Input } from "../../ui";
import uid from "./../../utils/uid";
import VariantImages from "./VariantImages";

interface Props { }

const Title = styled.p`
  margin-top: 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
`;

const QuestionNumber = styled.div<{ active: boolean }>`
  position: relative;
  width:40px;
  height:40px;
  text-align: center;
  line-height:40px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme, active }) => active ? theme.colors.primary.main : theme.colors.white};
  color: ${({ theme, active }) => !active ? theme.colors.primary.main : theme.colors.white};
  
  &:hover{
    background-color: ${({ theme, active }) => theme.colors.primary.light};
  }

`

const QuestionsTitle = styled.p`
  font-size: 24px;
  line-height: 28px;
`

const DeleteQuestionButton = styled.div`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};

  width: 20px;
  height: 20px;
  border-radius: 50%;

  position: absolute;

  right: -10px;
  top: -10px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s;


  &:hover {
    
    /* animation: magic 0.3s forwards ; */
    animation-iteration-count: 1;
    border-radius: ${({ theme }) => theme.radius};
  }


  @keyframes magic {
    0% {

    }

    100% {
      height: 40px;
    }
  }


`


const Option = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  box-sizing: border-box;

  padding: 10px;

  background: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.primary.main};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary.main : theme.colors.white};
  border-radius: ${({ theme }) => theme.radius};

  font-size: 14px;

  transition: all 0.3s;

  cursor: pointer;
`;

const booleanOptions = [
  {
    value: "is_anonymous",
    text: "Анонимно,",
  },
  {
    value: "is_discussing",
    text: "Без обсуждения,",
  },
  {
    value: "is_anonymous_discussing",
    text: "Анонимное обсуждение",
  },
];

export const QuizOptions: FC<Props> = (props) => {
  const [options, setOptions] = useState<any>({});
  const [isImages, setIsImages] = useState(false);

  const [variants, setVariants] = useState([
    { id: uid(), name: "", is_correct: false },
    { id: uid(), name: "", is_correct: true },
  ]);

  const [questions, setQuestions] = useState([uid()])
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0])

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCorrect = (id) => {
    setVariants((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, is_correct: !item.is_correct };
        }
        return item;
      });
    });
  };

  const handleCreateQuestion = () => {
    setQuestions([...questions, uid()])
    setSelectedQuestion(questions[questions.length - 1])
  }

  const deleteVariant = (id) => {
    if (variants.length < 3) return;
    setVariants((prev) => prev.filter(({ id: _id }) => _id !== id));
  };

  const createVariant = () => {
    if (variants.length > 9) return;
    setVariants([...variants, { id: uid(), name: "", is_correct: false }]);
  };

  const changeName = (id, value) => {
    setVariants((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, name: value };
        }
        return item;
      });
    });
  };
  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      createVariant()
    }
  }
  return (
    <>
      <Title className="mb-1">Опции тестирования</Title>

      <div className="d-flex gap-10 flex-wrap mb-2">
        {booleanOptions.map(({ value, text }) => (
          <Option
            onClick={() => toggleOption(value)}
            key={value}
            active={options[value]}
          >
            {options[value] ? <X /> : <Check />}
            {text}
          </Option>
        ))}
      </div>

      <QuestionsTitle className="mb-1">Вопросы</QuestionsTitle>
      <div className="d-flex flex-wrap gap-10 mb-2">

        {questions
          .map((question, index) => (
            <QuestionNumber
              onClick={() => setSelectedQuestion(question)}
              key={question} active={selectedQuestion === question}>
              {index + 1}
              {questions.length > 1 &&
                <DeleteQuestionButton onClick={() =>
                  setQuestions(prev => prev.filter(q => q !== question))}>
                  <X size="14px" />
                </DeleteQuestionButton>
              }
            </QuestionNumber>
          ))}
        <Button
          onClick={() => {
            handleCreateQuestion()
          }}
          color="success" height="40px" width="40px">
          <Plus />
        </Button>
      </div>

      <div className="mb-1 d-flex align-center justify-between">
        <Title>Варианты ответов</Title>
        <div
          className="d-flex align-center pointer"
          onClick={() => setIsImages(!isImages)}
        >
          <span className="mr-1">картинки</span>
          <Checkbox checked={isImages} />
        </div>
      </div>




      {isImages ? (
        <VariantImages />
      ) : (
        <>
          {variants.map(({ id, name, is_correct }, index) => (
            <Input
              className="mb-1"
              placeholder={"Вариант " + (index + 1)}
              key={id}
              append={
                <Checkbox
                  checked={is_correct}
                  onClick={() => toggleCorrect(id)}
                  style={{ marginLeft: 10 }}
                />
              }
              icon={variants.length > 2 && <X onClick={() => deleteVariant(id)} />}
              onChange={(e) => changeName(id, e.target.value)}
              onKeyUp={handleKeyUp}
              autoFocus
            />
          ))}

          <div className="d-flex justify-space">
            <Button onClick={createVariant}>Добавить вариант</Button>
          </div>
        </>
      )}
    </>
  );
};
