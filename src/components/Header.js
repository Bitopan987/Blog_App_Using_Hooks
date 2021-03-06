import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Header({ handleLogout }) {
  const userData = useContext(UserContext);
  const { isLoggedIn } = userData;
  return (
    <header className="flex fixed w-full justify-between sm:flex-col bg-gray-100 px-20 py-3 shadow-md rounded-md md:flex-row">
      <NavLink to="/">
        <h2 className="text-2xl font-extrabold text-gray-600 font-logo">
          Alt Blog
        </h2>
      </NavLink>
      <nav className="flex">
        {isLoggedIn ? (
          <AuthHeader handleLogout={handleLogout} />
        ) : (
          <NonAuthHeader />
        )}
      </nav>
    </header>
  );
}

function AuthHeader(props) {
  const userData = useContext(UserContext);
  const { user } = userData;
  let { handleLogout } = props;
  return (
    <nav className="flex sm:flex-col  md:flex-row justify-between flex-wrap items-center">
      <NavLink
        to={{
          user: props.user,
          pathname: `/profiles/${user.username}`,
        }}
        className="btn mr-5 mt:5 md:mt-0"
      >
        <span className="flex items-center text-xl mx-3">
          <img
            src={user.image || '/image/smiley.jpg'}
            className="w-7 h-7 rounded-full"
            alt="smiley.jpg"
          />
          <span className="ml-2 text-gray-400 font-medium">
            {user.username}
          </span>
        </span>
      </NavLink>
      <NavLink
        to="/articles"
        className={({ isActive }) =>
          `btn mr-5 mt:5 md:mt-0 ${isActive ? 'btn-active' : undefined}`
        }
      >
        Articles
      </NavLink>
      <NavLink
        to="/new-article"
        className={({ isActive }) =>
          `btn mr-5 mt-5 md:mt-0 ${isActive ? 'btn-active' : undefined}`
        }
      >
        New Article
      </NavLink>
      <button className="btn mt-5 lg:mt-0" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
function NonAuthHeader(props) {
  return (
    <nav className="flex">
      <NavLink
        to="/articles"
        className={({ isActive }) =>
          `btn ${isActive ? 'btn-active' : undefined}`
        }
      >
        Articles
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `btn ${isActive ? 'btn-active' : undefined}`
        }
      >
        Sign-Up
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          `btn ${isActive ? 'btn-active' : undefined}`
        }
      >
        Log-In
      </NavLink>
    </nav>
  );
}

export default Header;
