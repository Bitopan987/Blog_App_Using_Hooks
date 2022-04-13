import React, { useState, useEffect, useContext } from 'react';
import Comments from './Comments';
import UserContext from '../context/UserContext';
import commentsApi from '../apis/comments';

function NewComment(props) {
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState('');
  const info = useContext(UserContext);
  let slug = props.slug;

  useEffect(() => {
    getComments(slug);
  }, [slug]);

  function handleChange({ target }) {
    let { value } = target;
    setInputText(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let slug = props.slug;
    if (inputText) {
      try {
        const payload = { comment: { body: inputText } };
        await commentsApi.create(slug, payload);
        setInputText('');
        setComments('');
        getComments(slug);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async ({ target }) => {
    let { id } = target.dataset;
    let slug = props.slug;
    try {
      await commentsApi.destroy(slug, id);
      setComments('');
      getComments(slug);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (slug) => {
    try {
      const { data } = await commentsApi.comments(slug);
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  let loggedInUser = info?.user?.username;

  return (
    <>
      {loggedInUser && (
        <div className="">
          <form
            className="my-6 flex flex-col w-2/4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <textarea
              className="w-full border-2 border-gray-400 rounded-md p-3 outline-none focus:border-blue-500"
              rows="3"
              placeholder="Enter Comments"
              value={inputText}
              onChange={(e) => handleChange(e)}
              name="inputText"
            ></textarea>
            <input
              type="submit"
              value="Add Comment"
              className="px-4 py-2 shadow-md btn-primary self-end text-white text-xs rounded-md cursor-pointer hover:bg-blue-400 mt-5"
            />
          </form>
        </div>
      )}

      <div className="my-8">
        <Comments comments={comments} handleDelete={handleDelete} />
      </div>
    </>
  );
}

export default NewComment;
