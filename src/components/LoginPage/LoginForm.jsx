import React, { useState, useEffect, useContext } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";

import { colors } from "../../cssVariables";
import { UserContext } from "../../context/userContext";

function LoginForm() {
  // const { loading: loadingT, error: tweetsError, data: dataT } = useQuery(
  //   TWEETS_QUERY
  // );
  const { login: loginContext } = useContext(UserContext);
  const [loginReq, { loading, data, called }] = useMutation(LOGIN_MUTATION);

  const [{ email, password }, setState] = useState({
    email: "iulia@mail.com",
    password: "112211",
  });
  const [isTouched, setIsTouched] = useState({ email: false, password: false });
  const [error, setError] = useState({ email: "", password: "" });

  const handleChange = ({ target: { name, value } }) => {
    setState((s) => ({ ...s, [name]: value }));
    if (!isTouched[name]) setIsTouched((s) => ({ ...s, [name]: true }));
  };
  useEffect(() => {
    if (!email && isTouched.email)
      setError((s) => ({ ...s, email: "This field is required" }));
    if (email && isTouched.email) setError((s) => ({ ...s, email: "" }));
  }, [email, isTouched.email]);
  useEffect(() => {
    if (!password && isTouched.password)
      setError((s) => ({ ...s, password: "This field is required" }));
    if (password && isTouched.password)
      setError((s) => ({ ...s, password: "" }));
  }, [password, isTouched.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError((s) => ({ ...s, email: "This field is required" }));
      return;
    }
    if (!password) {
      setError((s) => ({ ...s, password: "This field is required" }));
      return;
    }
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const emailValidationFail = !email.match(regEx);
    if (emailValidationFail) {
      setError((s) => ({ ...s, email: "This should be a valid email" }));
      return;
    }

    loginReq({ variables: { email, password } });
  };

  useEffect(() => {
    if (data?.loginUser) loginContext(data.loginUser);
  }, [data]);

  console.log(called, data, loading, error);
  return (
    <form>
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

      <Button onClick={handleSubmit}>Log in</Button>
    </form>
  );
}

export default LoginForm;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(loginInput: { email: $email, password: $password }) {
      token
      userId
    }
  }
`;

const TWEETS_QUERY = gql`
  {
    tweets {
      _id
      text
    }
  }
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
  margin-bottom: 1em;
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
