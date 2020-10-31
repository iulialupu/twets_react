import React, { useEffect, useReducer, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

import { colors } from "../../cssVariables";
import { UserContext } from "../../context/userContext";

const defaultErr = "This field is required";
const initialState = {
  triedToSubmit: false,
  values: {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
  error: {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          [payload.name]: payload.value,
        },
        error: {
          ...state.error,
          [payload.name]:
            !payload.value && state.values[payload.name]
              ? "This field is required"
              : "",
        },
      };
    case "TRY_SUBMIT":
      // email
      let emailError = !state.values.email.length ? defaultErr : "";
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      emailError = !state.values.email.match(regEx)
        ? "This should be a valid email"
        : emailError;
      // username
      const usernameError = !state.values.username.length ? defaultErr : "";
      // password
      let passwordErr = !state.values.password.length
        ? defaultErr
        : state.values.password.length < 6
        ? "The password must be at least 6 characters long"
        : "";
      // confirm
      const confirmPasError = !state.values.confirmPassword.length
        ? defaultErr
        : state.values.password !== state.values.confirmPassword
        ? "Passwords do not match"
        : "";
      return {
        ...state,
        triedToSubmit: true,
        error: {
          email: emailError,
          username: usernameError,
          password: passwordErr,
          confirmPassword: confirmPasError,
        },
      };
    case "SUBMITED":
      return {
        ...state,
        triedToSubmit: false,
      };
    default:
      return state;
  }
};

const REGISTER_MUTATION = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    registerUser(
      registerInput: { email: $email, username: $username, password: $password }
    ) {
      token
      userId
    }
  }
`;

function RegisterForm() {
  const [registerReq, { loading, data, called }] = useMutation(
    REGISTER_MUTATION
  );
  const { login } = useContext(UserContext);

  const [{ triedToSubmit, values, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { email, username, password, confirmPassword } = values;

  const handleChange = ({ target: { name, value } }) => {
    dispatch({ type: "CHANGE_VALUE", payload: { name, value } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "TRY_SUBMIT" });
  };

  useEffect(() => {
    if (triedToSubmit && !Object.values(error).find((err) => err)) {
      console.log("submit", values);
      registerReq({ variables: { email, username, password } });
      dispatch({ type: "SUBMITED" });
    }
  }, [triedToSubmit, error]);

  console.log({ loading, data, called });

  useEffect(() => {
    if (data?.registerUser) login(data.registerUser);
  }, [data]);

  return (
    <form>
      <Header>Create a new account</Header>
      <InputContainer>
        <Label error={error.email} htmlFor="email">
          Email
        </Label>
        <Input
          error={error.email}
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        {error.email && <Error>{error.email}</Error>}
      </InputContainer>

      <InputContainer>
        <Label error={error.username} htmlFor="username">
          Username
        </Label>
        <Input
          error={error.username}
          name="username"
          type="username"
          value={username}
          onChange={handleChange}
        />
        {error.username && <Error>{error.username}</Error>}
      </InputContainer>

      <InputContainer>
        <Label error={error.password} htmlFor="password">
          Password
        </Label>
        <Input
          error={error.password}
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        {error.password && <Error>{error.password}</Error>}
      </InputContainer>

      <InputContainer>
        <Label error={error.confirmPassword} htmlFor="confirmPassword">
          Confirm Password
        </Label>
        <Input
          error={error.confirmPassword}
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />
        {error.confirmPassword && <Error>{error.confirmPassword}</Error>}
      </InputContainer>

      <Button onClick={handleSubmit}>Register</Button>
    </form>
  );
}

export default RegisterForm;

const Form = styled.form``;
const Header = styled.h2`
  margin-bottom: 1.5em;
  font-size: 17px;
  margin-top: 0;
`;
const Input = styled.input`
  width: 100%;
  background-color: ${colors.lightBlueBg};
  border: none;
  outline: none;
  border-bottom: 2px solid ${({ error }) => (error ? colors.red : colors.grey)};
  padding: 5px;
  font-size: 14px;
  box-sizing: border-box;
`;
const Label = styled.label`
  color: ${({ error }) => (error ? colors.red : colors.grey)};
  background-color: ${colors.lightBlueBg};
  font-size: 14px;
  display: block;
  padding: 3px;
  padding-bottom: 0;
`;
const Error = styled.span`
  color: ${colors.red};
  font-size: 12px;
  margin-top: 0;
`;
const InputContainer = styled.div`
  margin-bottom: 1.5em;
`;
const Button = styled.button`
  width: 100%;
  color: white;
  padding: 10px 16px;
  border: none;
  outline: none;
  background-color: ${colors.blue};
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    background-color: ${colors.hoverBlue};
  }
`;
