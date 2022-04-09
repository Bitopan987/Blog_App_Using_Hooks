import React, { useState } from 'react';
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

  const handleChange = ({ target }) => {
    let { name, value } = target;
    if (name === 'title') {
      validations(errors, name, value);
      setTitle(value);
      {
        setErrors({ ...errors, title: errors });
      }
    } else if (name === 'description') {
      validations(errors, name, value);
      setDescription(value);
      {
        setErrors({ ...errors, description: errors });
      }
    } else if (name === 'tags') {
      validations(errors, name, value);
      setTags(value);
      {
        setErrors({ ...errors, tags: errors });
      }
    } else if (name === 'body') {
      validations(errors, name, value);
      setBody(value);
      {
        setErrors({ ...errors, body: errors });
      }
    }
  };

  const handleSubmit = async (event) => {
    tags = tags.split(',').map((tag) => tag.trim());
    event.preventDefault();
    if (title && description && tags && body) {
      try {
        const payload = {
          article: { title, description, tagList: tags, body },
        };
        const { data } = await articlesApi.create(payload);
        console.log(data);
        setTitle('');
        setDescription('');
        setTags('');
        setBody('');
        setErrors('');
      } catch (error) {
        setErrors({ ...errors, email: 'Enter all fields' });
      }
    }
  };

  return (
    <section>
      <form
        className="bg-gray-100 p-8 text-center rounded-md w-2/4 mt-20 mx-auto "
        onSubmit={handleSubmit}
      >
        <input
          className="block w-full py-2 px-3 border border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Title"
          value={title}
          name="title"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Description"
          value={description}
          name="description"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Tags"
          value={tags}
          name="tags"
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
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
