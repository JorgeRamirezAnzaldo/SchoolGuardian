import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import DashboardTutor from './pages/DashboardTutor';
import StudentAttendance from './pages/studentAttendance';
import StudentEvaluation from './pages/StudentEvaluation';
import StudentAlert from './pages/StudentAlert';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
            <Routes>
              <Route path="/" element={ <Login /> } />
              <Route path="/Home" element={ <Home /> } />
              <Route path="/student/:id" element={ <DashboardTutor /> } />
              <Route path="/attendance/:id" element={ <StudentAttendance /> } />
              <Route path="/grades/:id" element={ <StudentEvaluation /> } />
              <Route path="/alerts/:id" element={ <StudentAlert /> } />
            </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;