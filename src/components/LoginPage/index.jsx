import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { FiUsers, FiSearch, FiMessageSquare } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import { colors } from "../../cssVariables";
import { UserContext } from "../../context/userContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Modal from "../reusable/Modal";

const list = [
  { icon: <FiSearch />, text: "Follow your interests" },
  { icon: <FiUsers />, text: "Hear what people are talking about" },
  { icon: <FiMessageSquare />, text: "Join the conversation" },
];

function LoginPage() {
  const history = useHistory();
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated]);

  return (
    <Main>
      <Half blue>
        <List>
          {list.map(({ icon, text }, i) => (
            <ListItem key={i}>
              <ListIcon>{icon}</ListIcon>
              <p>{text}</p>
            </ListItem>
          ))}
        </List>
      </Half>
      <Half>
        <Container>
          <TwitterIcon />
          <h1 style={{ marginBottom: "1.5em" }}>
            See what’s happening in the world right now
          </h1>
          <LoginForm />
          <div style={{ marginTop: "1.5em" }}>
            <SecondaryBtn>Forgot password</SecondaryBtn>
            <Modal button={<SecondaryBtn>Sign up</SecondaryBtn>}>
              <RegisterForm />
            </Modal>
          </div>
        </Container>
      </Half>
    </Main>
  );
}

const Main = styled.main`
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
`;

const Half = styled.div`
  margin: 0;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background-image: ${({ blue }) =>
    blue &&
    `linear-gradient(to bottom right, ${colors.lightBlue}, ${colors.blue})`};
`;

const List = styled.ul`
  list-style-type: none;
  color: white;
  padding-left: 0;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 20px;
`;
const ListIcon = styled.span`
  margin-right: 1em;
  margin-top: 4px;
  font-size: 25px;
  line-height: 25px;
`;
///////
const Container = styled.div`
  max-width: 360px;
  margin: 3em;
`;
const TwitterIcon = styled(FaTwitter)`
  color: ${colors.blue};
  font-size: 40px;
  margin-bottom: 0;
`;
const SecondaryBtn = styled.a`
  color: grey;
  text-decoration: underline;
  margin-right: 1.6em;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #555;
  }
`;

export default LoginPage;
