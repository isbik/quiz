import { useStore } from "effector-react";
import { useRef } from "react";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import QuizCard from "../components/QuizCard";
import { userStore } from "../modules/User/user-store";
import Loader from "./../components/Loader";
import { confetti } from "./../utils/runConfitti";
import TestingCard from "../components/TestingCard";
import postApi from "./../modules/Record/api-post";
import Toast from "../components/Toast";
import { User } from "react-feather";
import Notifications from "../components/Notifications";

const testings = [
  {
    id: 1,
    start_at: new Date(Date.now() + 1000 * 5),
    end_at: null,
    name: "Тестирование",
    question_count: 15,
    question_time: 12,
  },
  {
    id: 2,
    start_at: new Date(Date.now() + 1000 * 657),
    end_at: new Date(Date.now() + 60 + 60 * 5),
    name: "Тестирование по математике",
    question_count: 15,
    question_time: 12,
  },
  {
    id: 3,
    start_at: new Date(Date.now() + 12),
    end_at: null,
    name: "Тестирование",
    question_count: 25,
    question_time: null,
  },
];

const Index = () => {
  const [open, setOpen] = useState(true);
  const user = useStore(userStore);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postApi.getPost().then((response) => {
      setPosts(response.data.data);
    });
  }, []);

  return (
    <div className="container">
      {testings.map((testing) => (
        <TestingCard className="mb-2" key={testing.id} {...testing} />
      ))}
      <QuizCard className="mb-2" />
      {posts.map(({ id, name, content, created_at }) => (
        <PostCard
          key={id}
          className="mb-2 p-2"
          body={content}
          title={name}
          created_at={created_at}
        ></PostCard>
      ))}
    </div>
  );
};

export default Index;
