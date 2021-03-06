import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Article from './components/Article';
import NewArticle from './components/NewArticle';
import NoMatch from './components/NoMatch';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Signup from './components/Signup';
import UpdateArticle from './components/UpdateArticle';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';
import authInitializer from './apis/axios';
import authApi from './apis/auth';
import FullPageLoader from './components/FullPageLoader';
import LOCAL_STORAGE_KEY from './utils/constants';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await authApi.currentUser();
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.setItem(LOCAL_STORAGE_KEY, null);
    navigate(`/`);
  };

  useEffect(() => {
    authInitializer();
    fetchUser();
  }, []);

  if (loading) {
    return <FullPageLoader />;
  } else {
    return (
      <UserProvider
        value={{
          isLoggedIn: isLoggedIn,
          user: user,
          setUser: setUser,
          setIsLoggedIn: setIsLoggedIn,
        }}
      >
        <ErrorBoundary>
          <Header handleLogout={handleLogout} />
          {isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
        </ErrorBoundary>
      </UserProvider>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/edit/:slug" element={<UpdateArticle />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/new-article" element={<NewArticle />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/profiles/:id"
        element={<Profile user={props.user} isLoggedIn={props.isLoggedIn} />}
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

function UnAuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/profiles/:id" element={<Profile user={props.user} />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
