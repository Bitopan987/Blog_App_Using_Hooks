import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import articlesApi from '../apis/articles';
import { validations } from '../utils/validations';

// import MarkdownIt from 'markdown-it';
// import MarkdownEditor from 'react-markdown-editor-lite';

function NewArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    tags: '',
    body: '',
  });

  const navigate = useNavigate();
  const handleErrors = ({ target }) => {
    let { name, value } = target;
    let errorsClone = { ...errors };
    validations(errorsClone, name, value);
    setErrors(errorsClone);
  };

  const handleSubmit = async (event) => {
    const tagList = tags.split(',').map((tag) => tag.trim());
    event.preventDefault();
    if (title && description && tagList.length && body) {
      try {
        const payload = {
          article: { title, description, tags, body },
        };
        const { data } = await articlesApi.create(payload);
        console.log(data);
        navigate(`/articles/${data.article.slug}`);
      } catch (error) {
        setErrors('Enter all fields');
      }
    }
  };

  return (
    <section className="pt-40">
      <form
        className="bg-gray-100 p-8 text-center rounded-md w-2/4  mx-auto "
        onSubmit={handleSubmit}
      >
        <input
          className="block w-full py-2 px-3 border border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Title"
          value={title}
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
            handleErrors(e);
          }}
        ></input>
        <input
          className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Description"
          value={description}
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
            handleErrors(e);
          }}
        ></input>
        <input
          className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Tags"
          value={tags}
          name="tags"
          onChange={(e) => {
            setTags(e.target.value);
            handleErrors(e);
          }}
        ></input>
        {/* <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          onSubmit={clearEditor}
        /> */}
        <textarea
          className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
          name="body"
          placeholder="Write Your Story"
          value={body}
          cols="40"
          rows="5"
          onChange={(e) => {
            setBody(e.target.value);
            handleErrors(e);
          }}
        ></textarea>
        <input
          type="submit"
          value="Publish Article"
          className="inline-block  py-2 px-4  bg-green-500 text-white font-bold cursor-pointer mt-4 px-4 rounded-md"
        />
      </form>
    </section>
  );
}

export default NewArticle;
