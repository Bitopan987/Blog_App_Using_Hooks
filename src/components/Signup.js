import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../apis/auth';
import LOCAL_STORAGE_KEY from '../utils/constants';
import { validations } from '../utils/validations';

function Signup() {
  const initialData = {
    username: '',
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialData);
  const [errors, setErrors] = useState(initialData);

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
        setUser({ password: '', email: '', username: '' });
        localStorage.setItem(LOCAL_STORAGE_KEY, data.user.token);
        window.location.href = '/articles';
      } catch (error) {
        console.log(error);
      }
    }
  };

  let { username, password, email } = errors;
  return (
    <main className="bg-gray-300 py-10">
      <section className="py-20">
        <form
          className="w-1/3 mx-auto border border-gray-400 p-6 rounded-md shadow-md"
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
              className="block  w-full btn bg-gray-500 text-white font-bold cursor-pointer"
              disabled={username || email || password}
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default Signup;
