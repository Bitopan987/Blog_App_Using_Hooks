import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { validations } from '../utils/validations';
import authApi from '../apis/auth';
import LOCAL_STORAGE_KEY from '../utils/constants';
import authInitializer from '../apis/axios';

import UserContext from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const info = useContext(UserContext);
  const navigate = useNavigate();

  const handleErrors = ({ target }) => {
    let { name, value } = target;
    let errorsClone = { ...errors };
    validations(errorsClone, name, value);
    setErrors(errorsClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password && email) {
      try {
        const payload = { user: { password, email } };
        const { data } = await authApi.login(payload);
        info.setUser(data.user);
        info.setIsLoggedIn(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, data.user.token);
        authInitializer();
        navigate(`/articles`);
      } catch (error) {
        setErrors({ ...errors, email: 'Email or Password is incorrect!' });
      }
    }
  };

  return (
    <main className=" pt-20">
      <section className="py-20">
        <form
          className="w-1/3 mx-auto border bg-gray-100 border-gray-400 p-6 rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <legend className="text-2xl font-bold">Sign In</legend>
            <Link to="/register">
              <span className="text-gray-700 text-lg text-center">
                {' '}
                New here?{' '}
              </span>
            </Link>
          </div>
          <fieldset className="my-3">
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
                handleErrors(e);
              }}
            />
            <span className="text-red-500">{errors.email}</span>

            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                handleErrors(e);
              }}
            />
            <span className="text-red-500">{errors.password}</span>

            <input
              type="submit"
              value="Log In"
              className="rounded block mt-6 py-2 w-full btn-gray  font-bold cursor-pointer"
              disabled={errors.password || errors.email}
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default Login;
