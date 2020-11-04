import React, { useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserContextProvider } from "./context/userContext";
import { ThemeContextProvider } from "./context/themeContext";
import LoginPage from "./components/LoginPage/index";
import Home from "./components/Home";
import User from "./components/User";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <UserContextProvider>
          <ThemeContextProvider>
            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/user" exact component={User} />
              <Route path="/" component={Home} />
            </Switch>
          </ThemeContextProvider>
        </UserContextProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
