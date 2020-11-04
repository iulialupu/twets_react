import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaUser, FaTwitter, FaSignOutAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdSettings } from "react-icons/md";

import { ThemeContext } from "../context/themeContext";
import { UserContext } from "../context/userContext";
import Tooltip from "./reusable/Tooltip";
import CustomPopover from "./reusable/Popover";
import ThemeSettings from "./ThemeSettings";

function TopNav() {
  const { color, theme } = useContext(ThemeContext);
  const { isAuthenticated, userInfo, logout } = useContext(UserContext);
  return (
    <Nav color={color} theme={theme}>
      <Menu>
        <Tooltip content="Home">
          <Link to="/">
            <IconButton color={color} theme={theme}>
              <FaTwitter size={21} style={{ marginTop: "2px" }} />
            </IconButton>
          </Link>
        </Tooltip>
        {isAuthenticated && (
          <Tooltip content="My page">
            <Link to={`/user`}>
              <IconButton color={color} theme={theme}>
                <FaUser size={18} />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        {isAuthenticated && (
          <Tooltip content="Write post">
            <IconButton color={color} theme={theme}>
              <IoIosSend
                size={25}
                style={{ marginRight: "2px", marginTop: "3px" }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Menu>

      <RightSide>
        {isAuthenticated && (
          <Username theme={theme}>Welcome, {userInfo.username}</Username>
        )}

        <div style={{ marginRight: "20px" }}>
          <CustomPopover
            trigger={
              <Tooltip content="Settings">
                <StyledIcon color={color}>
                  <MdSettings style={{ marginTop: "4px" }} />
                </StyledIcon>
              </Tooltip>
            }
            content={<ThemeSettings />}
          />
        </div>

        {isAuthenticated ? (
          <Tooltip content="Log out">
            <StyledIcon color={color}>
              <FaSignOutAlt onClick={logout} />
            </StyledIcon>
          </Tooltip>
        ) : (
          <Link to="/login">
            <Button color={color} theme={theme}>
              Log in
            </Button>
          </Link>
        )}
      </RightSide>
    </Nav>
  );
}

export default TopNav;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  padding: 7px 20px;
  margin: 0;
  border-bottom: 1px solid ${({ color }) => color.darkGrey};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primaryText};
  display: flex;
  justify-content: space-between;
`;

const IconButton = styled.div`
  margin: 0;
  margin-right: 12px;
  padding: 5px;
  border: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // font-size: 20px;
  color: ${({ theme }) => theme.background};
  background-color: ${({ color }) => color.primary};
  transition: bacground-color 0.2s ease;

  &: hover {
    background-color: ${({ color }) => color.hover};
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.div`
  color: ${({ color }) => color.primary};
  cursor: pointer;
  font-size: 23px;
  display: flex;
  align-items: center;
  padding: 0;
  line-height: 20px;
  margin: 0;
  &: hover {
    color: ${({ color }) => color.hover};
  }
`;

const Button = styled.div`
  width: 100%;
  padding: 8px 20px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.background};
  color: ${({ color }) => color.primary};
  border: 1px solid ${({ color }) => color.primary};
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;
  &:hover {
    background-color: ${({ color }) => color.primary};
    color: ${({ theme }) => theme.background};
  }
`;
const Username = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 13px;
  margin-right: 20px;
  margin-top: 3px;
`;
