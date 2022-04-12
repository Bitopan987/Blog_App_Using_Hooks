import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { validations } from '../utils/validations';
import { useNavigate } from 'react-router';

import Loader from './Loader';
import articlesApi from '../apis/articles';

function UpdateArticle() {
  const [article, setArticle] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [body, setBody] = useState();
  const [tags, setTags] = useState();
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    tags: '',
    body: '',
  });

  const navigate = useNavigate();
  const { slug } = useParams();

  const getArticle = async () => {
    try {
      const { data } = await articlesApi.article(slug);
      setArticle(data.article);
      setTitle(data.article.title);
      setDescription(data.article.description);
      setBody(data.article.body);
      setTags(data.article.tagList.join(','));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getArticle();
  }, [slug]);

  const handleErrors = ({ target }) => {
    let { name, value } = target;
    let errorsClone = { ...errors };
    validations(errorsClone, name, value);
    setErrors(errorsClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event, tags);
    const tagList = tags.split(',').map((tag) => tag.trim());
    if (title && description && tagList && body) {
      try {
        const payload = {
          article: { title, description, tags: tagList, body },
        };
        const { data } = await articlesApi.update(slug, payload);
        console.log(data);
        setArticle(data.article);
        navigate(`/articles/${slug}`);
      } catch (errors) {
        setErrors({ errors: 'Enter all fields' });
      }
    }
  };

  if (!article) {
    return (
      <div className="pt-16">
        <Loader />
      </div>
    );
  }

  return (
    <section className="pt-24">
      <form
        className="w-1/2 mx-auto p-8 border border-gray-400 rounded-md"
        onSubmit={handleSubmit}
      >
        <legend className="text-3xl text-center font-bold my-3 text-indigo-900">
          Edit Article
        </legend>
        <fieldset className="flex flex-col">
          {/* <span className="text-red-500 my-1">{errors}</span> */}
          <input
            type="text"
            value={title}
            placeholder="Title"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
              handleErrors(e);
            }}
            className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
          />
          <input
            type="text"
            value={description}
            name="description"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
              handleErrors(e);
            }}
            className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
          />
          <textarea
            rows="4"
            value={body}
            name="body"
            placeholder="Articles's Body"
            onChange={(e) => {
              setBody(e.target.value);
              handleErrors(e);
            }}
            className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
          ></textarea>
          <input
            type="text"
            value={tags}
            name="tags"
            placeholder="Tag List(comma seperated)"
            onChange={(e) => {
              setTags(e.target.value);
              handleErrors(e);
            }}
            className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
          />
          <input
            type="submit"
            value="Update Article"
            className="btn-blue w-2/6 self-end mt-2"
          />
        </fieldset>
      </form>
    </section>
  );
}

export default UpdateArticle;
