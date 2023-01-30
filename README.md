# Nomad_React_react-hook-form

## Installation

```
$ npx create-react-app ./ --template typescript
$ npm install react-hook-form
$ npm install styled-components
$ npm install --save-dev @types/styled-components
```

## react-hook-form

- 로그인, 회원가입 등 많은 input 을 사용해야 하고 그에 대한 validation 을 해줘야 할 때 사용

#### register

- onChange, onBlur, ref 사용 가능.
- input 에 {...register("todo")} 넣으면 register 함수가 반환하는 객체를 가져다가 input 에 props 로 주는 것
- register 의 인수 값으로 들어가는 key 값은 띄어쓰기 x

#### watch

- form 의 입력값들의 변화를 관찰할 수 있게 해주는 함수

#### handleSubmit

- validation 담당, event.preventDefault 등 onSubmit 에 들어가는 핸들링 함수
- onSubmit 에 handleSubmit 을 넣어주고 인수로 onValid 와 onInValid 가 들어갈 수 있는데 onValid 는 필수 인수로 데이터가 유효할 때 호출되는 함수이고 onInValid 는 필수 인수는 아니며 데이터가 유효하지 않을 때 호출되는 함수

#### add validation

- {...register("Email", { required: true, ... })}
- 굳이 input 의 속성으로 넣지 않고 register 에 넣어주는 이유는 브라우저의 소스코드에서 required 속성을 지울 경우 유효성 검사를 거치지 않고 제출이 되기 때문
- 유효성 검사를 통과하지 못한 input 에 자동으로 포커싱해주는 기능도 있음
- messege 추가 : 유효하지 않을 때 나올 메시지 지정 가능

```
// ex
required: "Password is required"
minLength: {
  value: 5,
  message: "Your password is too short",
})
```

- 정규식 : email, id, password 등에 사용되는 pattern 추가 가능

```
// ex
pattern: {
  value: /^[A-Za-z0-9._%+-]+@naver.com$/,
  message: "Only naver.com emails allowed",
},
```

#### formState

- formState.errors : 유효성 검사가 통과 되지 못한 이유(type)와 그 때 보여줄 message 를 반환

-❗주의 : 화면에 errors 를 출력할 때 useForm 에 어떤 register 가 있는지 type 지정 필수, required 한 값이 아니라면 ? 를 붙여줘야 함

#### defaultValues

- useForm 에 필수 입력값을 줄 수 있는 옵션

```
// ex
useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
```

#### setError

- 에러 메시지 추가 가능
- shouldFocus : 에러 시 input 에 포커싱 기능

```
// ex
setError("extraError", { message: "Server Offline" });

setError(
    "password2",
    { message: "Password are not the same" },
    { shouldFocus: true }
  );
```

#### validate

- 입력값을 받아 유효성 검사 가능 (어떤 단어가 포함되어 있거나 이미 있는 아이디 등등)
- async 로 비동기로 만들어서 서버에 확인하고 응답을 받을 수도 있음

```
// ex : true or false 인지 확인
validate: (value) => !value.includes("nico")

// ex : false 일 때 메시지 반환
validate: (value) =>
    value.includes("nico") ? "no nicos allowed" : true,

// ex : 확인해야 할 검사가 여러 개 일 때
validate: {
    noNico: (value) =>
        value.includes("nico") ? "no nico allowed" : true,
    noNick: (value) =>
        value.includes("nick") ? "no nick allowed" : true,
},


```
