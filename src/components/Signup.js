import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../apis/auth';
import LOCAL_STORAGE_KEY from '../utils/constants';
import authInitializer from '../apis/axios';
import { validations } from '../utils/validations';
import UserContext from '../context/UserContext';

function Signup() {
  const initialData = {
    username: '',
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const navigate = useNavigate();
  const info = useContext(UserContext);

  function handleChange({ target }) {
    let { name, value } = target;
    validations(errors, name, value);
    setUser({ ...user, [name]: value });
    setErrors(errors);
  }

  const handleSubmit = async (event) => {
    let { email, password, username } = user;
    event.preventDefault();
    if (username && password && email) {
      try {
        const payload = { user: { username, password, email } };
        const { data } = await authApi.signup(payload);
        info.setUser(data.user);
        info.setIsLoggedIn(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, data.user.token);
        authInitializer();
        navigate(`/articles`);
      } catch (error) {
        setErrors((errors) => ({
          ...errors,
          ...error.response.data.errors,
        }));
      }
    }
  };

  let { username, password, email } = errors;
  return (
    <main className=" py-10">
      <section className="py-20">
        <form
          className="w-1/3 mx-auto border  bg-gray-100 border-gray-400 p-6 rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <legend className="text-2xl font-bold">Sign Up</legend>
            <Link to="/login">
              <span className="text-gray-700 text-lg text-center">
                Already Have an account?{' '}
              </span>
            </Link>
          </div>
          <fieldset className="my-3">
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Username"
              value={user.username}
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <span className="text-red-500">{username}</span>
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Email"
              value={user.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <span className="text-red-500">{email}</span>

            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="password"
              placeholder="Enter Password"
              value={user.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <span className="text-red-500">{password}</span>

            <input
              type="submit"
              value="Sign Up"
              className="rounded block mt-6 py-2 w-full btn-gray  font-bold cursor-pointer"
              disabled={username || email || password}
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default Signup;
