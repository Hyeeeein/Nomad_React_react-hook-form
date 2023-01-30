import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password1: string;
  password2: string;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  // console.log(watch()); // input 입력값 추적

  const onValid = (data: IForm) => {
    console.log(data); // input 에 입력한 값이 출력

    if (data.password1 !== data.password2) {
      setError(
        "password2",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server Offline" });
  };
  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          type="text"
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>

        <input
          {...register("firstName", {
            required: "write here",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          type="text"
          placeholder="First Name"
        />
        <span>{errors.firstName?.message}</span>

        <input
          {...register("lastName", { required: "write here" })}
          type="text"
          placeholder="Last Name"
        />
        <span>{errors.lastName?.message}</span>

        <input
          {...register("username", { required: "write here", minLength: 10 })}
          type="text"
          placeholder="User name"
        />
        <span>{errors.username?.message}</span>

        <input
          {...register("password1", {
            required: "write here",
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          type="text"
          placeholder="Password 1"
        />
        <span>{errors.password1?.message}</span>

        <input
          {...register("password2", {
            required: "Password is required",
            minLength: 5,
          })}
          type="text"
          placeholder="Password 2"
        />
        <span>{errors.password2?.message}</span>

        <button>ADD</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ToDoList;

/* useForm 사용 X
const ToDoList = () => {
  const [todo, setTodo] = useState("");
  const [todoError, setTodoError] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTodoError("");
    setTodo(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.length < 10) {
      return setTodoError("To do should be longer");
    }
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={todo}
          onChange={onChange}
          type="text"
          placeholder="Write a to do"
        />
        <button>ADD</button>
        {todoError !== "" ? todoError : null}
      </form>
    </div>
  );
};

export default ToDoList; */
