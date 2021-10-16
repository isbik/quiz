import React from "react";
import styled from "styled-components";
import { Button, Card, Input } from "../../ui";
import useField from "./../../hooks/useField";
import postApi from "../../modules/Record/api-post";
import { addNotification } from "./../../effector/notification-state";
import uid from "../../utils/uid";

interface Props {}

const Post = (props: Props) => {
  const name = useField("");
  const content = useField("");

  const handleCreate = () => {
    postApi
      .createPost({ name: name.value, content: content.value })
      .then((response) => {
        addNotification({
          id: uid(),
          title: "Запись была создана",
          subtitle: name.value,
          type: "success",
        });
      })
      .catch(() => {
        addNotification({
          id: uid(),
          title: "Ошибка при создании записи",
          subtitle: name.value,
          type: "error",
        });
      });
  };

  return (
    <div className="container">
      <Card blur className="p-2">
        <h1 className="m-0 mb-2">Новая публикация</h1>

        <Input
          {...name}
          className="mb-2"
          label="Название публикации"
          placeholder="Мой заголовок"
        />

        <Input
          {...content}
          className="mb-2"
          placeholder="Описание публикации"
          label="Контент"
          component="textarea"
          rows="5"
        />

        <div className="d-flex justify-end">
          <Button className="mr-1" flat>
            Отменить
          </Button>
          <Button onClick={handleCreate} color="success">
            Опубликовать
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Post;
