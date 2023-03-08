//Import react
import React from 'react';
//Import BrowserRouter as Router, Route and Routes 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Import necessary objects/classes from @apollo/client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
//Import context
import { setContext } from '@apollo/client/link/context';
//Import pages and necessary components
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

//Build main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//Build request middleware that will attach JWT token to each request as authorization header
const authLink = setContext((_, { headers }) => {
  //Obtain authentication token from localStorage if it exists
  const token = localStorage.getItem('id_token');
  //Return context headers so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//Create new ApolloClient
const client = new ApolloClient({
  //Configure client to execute authLink middleware before performing a request to the GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//Define function to return App with Header and proper Router to go the necessary Pages
function App() {
  return (
    <ApolloProvider client={client}>
      
      <Router>
        <Header/>
            <Routes>
              <Route path="/" element={ <Login /> } />
              <Route path="/Home" element={ <Home /> } />
              <Route path="/Login" element={ <Login /> } />
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

//Export App
export default App;