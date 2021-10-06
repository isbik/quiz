import React from "react";
import Modal from "../../../components/Modal";
import TestingPassingForm from "./../../../components/TestingPassingForm";

interface Props {}

const TestingPassing = (props: Props) => {
  const handleClose = () => {
    console.log(123);
  };

  const data = {
    name: "Тестирование по математике",
    time: 5,
    questions: [
      {
        id: 1,
        name: "Сколько будет 5 + 5",
        variants: [
          {
            id: 1,
            name: "5",
          },
          {
            id: 2,
            name: "10",
          },
          {
            id: 3,
            name: "15",
          },
        ],
      },
      {
        id: 2,
        name: "Сколько будет 2 + 5",
        variants: [
          {
            id: 1,
            name: "1",
          },
          {
            id: 2,
            name: "2",
          },
          {
            id: 3,
            name: "7",
          },
        ],
      },
      {
        id: 3,
        name: "Сколько будет 52 + 5",
        variants: [
          {
            id: 1,
            name: "8",
          },
          {
            id: 2,
            name: "Не проавильно ответа",
          },
          {
            id: 3,
            name: "7",
          },
        ],
      },
    ],
  };

  return (
    <Modal
      close={handleClose}
      hideClose
      open={true}
      style={{ backgroundColor: "transparent" }}
    >
      <TestingPassingForm testing={data} />
    </Modal>
  );
};

export default TestingPassing;
