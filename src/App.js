import React, { useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { UserContextProvider } from "./context/userContext";
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
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/user" exact component={User} />
            <Route path="/" component={Home} />
          </Switch>
        </UserContextProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
