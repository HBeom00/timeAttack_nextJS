"use client";

import { PostType } from "@/types/post";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState<PostType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getTodo();
  }, []);

  // Todo List 보여주기
  const getTodo = async () => {
    const res = await axios("http://localhost:4000/todos");
    const data = res.data;
    setTodo(data);
  };

  // 추가 버튼 클릭 시
  const onClickAddBtn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "" || content === "") {
      alert("값을 입력해주세요.");
      return;
    }

    const newTodo: PostType = {
      id: crypto.randomUUID(),
      title: title,
      contents: content,
      isDone: false,
    };

    await axios.post("http://localhost:4000/todos", newTodo);

    setTodo([...todo, newTodo]);
    setTitle("");
    setContent("");
  };

  // 완료 버튼 클릭 시
  const onClickSuccessBtn = async ({
    id,
    isDone,
  }: {
    id: string;
    isDone: boolean;
  }) => {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      isDone: !isDone,
    });
  };

  // 삭제 버튼 클릭 시
  const onClickDeleteBtn = async (id: string | number) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    const deleteTodo = todo.filter((el) => el.id !== id);
    setTodo(deleteTodo);
  };

  return (
    <>
      <form onSubmit={onClickAddBtn} style={{ display: "flex" }}>
        <div>
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ border: "1px solid black" }}
          />
        </div>
        <div>
          내용
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ border: "1px solid black" }}
          />
        </div>
        <button>추가하기</button>
      </form>
      <div>
        working...
        {todo.map((el) => {
          return (
            <div key={el.id}>
              {el.isDone === false ? (
                <div
                  style={{
                    border: "1px solid black",
                    padding: "20px",
                    width: "200px",
                  }}
                >
                  <div>
                    <p>{el.title}</p>
                  </div>
                  <div>
                    <p>{el.contents}</p>
                  </div>
                  <div>
                    <p>{`${el.isDone}`}</p>
                  </div>
                  <div>
                    <button
                      style={{
                        border: "1px solid black",
                        marginRight: "20px",
                        padding: "8px",
                      }}
                      onClick={() => onClickDeleteBtn(el.id)}
                    >
                      삭제
                    </button>
                    <button
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                      onClick={() =>
                        onClickSuccessBtn({
                          id: el.id,
                          isDone: el.isDone,
                        })
                      }
                    >
                      완료
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
        isDone...
        {todo.map((el) => {
          return (
            <div key={el.id}>
              {el.isDone === true ? (
                <div
                  style={{
                    border: "1px solid black",
                    padding: "20px",
                    width: "200px",
                  }}
                >
                  <div>
                    <p>{el.title}</p>
                  </div>
                  <div>
                    <p>{el.contents}</p>
                  </div>
                  <div>
                    <p>{`${el.isDone}`}</p>
                  </div>
                  <div>
                    <button
                      style={{
                        border: "1px solid black",
                        marginRight: "20px",
                        padding: "8px",
                      }}
                      onClick={() => onClickDeleteBtn(el.id)}
                    >
                      삭제
                    </button>
                    <button
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                      onClick={() =>
                        onClickSuccessBtn({
                          id: el.id,
                          isDone: el.isDone,
                        })
                      }
                    >
                      완료
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Todo;
