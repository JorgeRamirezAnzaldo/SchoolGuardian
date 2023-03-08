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
import Header from './components/Header'
import DashboardTutor from './pages/DashboardTutor';
import StudentAttendance from './pages/studentAttendance';
import StudentEvaluation from './pages/StudentEvaluation';
import StudentAlert from './pages/StudentAlert';
import CreateAlert from './pages/CreateAlert';
import DeleteStudent from './pages/DeleteStudent';
import ClassesProfessor from './pages/ClassesProfessor';
import ClassStudents from './pages/ClassStudents';

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
      <Header/>
      <Router>
            <Routes>
              <Route path="/" element={ <Login /> } />
              <Route path="/Home" element={ <Home /> } />
              <Route path="/student/:id" element={ <DashboardTutor /> } />
              <Route path="/attendance/:id" element={ <StudentAttendance /> } />
              <Route path="/grades/:id" element={ <StudentEvaluation /> } />
              <Route path="/alerts/:id" element={ <StudentAlert /> } />
              <Route path="/createAlert" element={ <CreateAlert /> } />
              <Route path="/deleteStudent" element={ <DeleteStudent /> } />
              <Route path="/classes/:userId" element={ <ClassesProfessor /> } />
              <Route path="/class/:classId" element={ <ClassStudents /> } />
            </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;