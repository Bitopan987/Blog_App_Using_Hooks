import React, { useState, useEffect, useContext } from 'react';
import { validations } from '../utils/validations';
import Loader from './Loader';
import UserContext from '../context/UserContext';
import profileApi from '../apis/profile';
import { useNavigate } from 'react-router';

function Settings() {
  const [image, setImage] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const info = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    let { image, username, bio } = info.user;
    setImage(image);
    setUserName(username);
    setBio(bio);
  }, [info.user]);

  const handleErrors = ({ target }) => {
    let { name, value } = target;
    let errorsClone = { ...errors };
    validations(errorsClone, name, value);
    setErrors(errorsClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && image && password && bio) {
      try {
        const payload = { user: { username, password, bio, image } };
        const { data } = await profileApi.update(payload);
        navigate(`/profiles/${data.user.username}`);
      } catch (error) {
        setErrors(error);
      }
    }
  };

  if (!username && !image && !bio) {
    return <Loader />;
  }
  // let { username, password } = errors;

  return (
    <main className="pt-8">
      <section className="py-20">
        <form
          className="w-1/2 mx-auto p-8 border border-gray-400 rounded-md"
          onSubmit={handleSubmit}
        >
          <legend className="text-center mb-4 text-3xl my-1 font-bold">
            Settings
          </legend>
          <fieldset className="flex flex-col">
            <input
              type="text"
              placeholder="Image Url"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                handleErrors(e);
              }}
              name="image"
              className="my-1 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            />

            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                handleErrors(e);
              }}
              className="my-1 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            />
            <span className="my-1 text-red-500">{errors.username}</span>

            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                handleErrors(e);
              }}
              className="my-1 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            />
            <span className="my-1 text-red-500">{errors.password}</span>

            <textarea
              value={bio}
              rows="4"
              name="bio"
              placeholder="Enter your Bio"
              onChange={(e) => {
                setBio(e.target.value);
                handleErrors(e);
              }}
              className="my-1 p-2  rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            ></textarea>

            <input
              type="submit"
              value="Update"
              className="mt-2 btn-green"
            ></input>
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default Settings;
