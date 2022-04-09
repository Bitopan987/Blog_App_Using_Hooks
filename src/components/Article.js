import React, { useState, useContext, useEffect } from 'react';
import Loader from './Loader';
import { Link, useParams } from 'react-router-dom';
import { ARTICLES_URL } from '../apis/urls';
import LOCAL_STORAGE_KEY from '../utils/constants';
import Comments from './Comments';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
import UserContext from '../context/UserContext';

function Article(props) {
  const { slug } = useParams();
  console.log(slug);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const userData = useContext(UserContext);
  const { isLoggedIn, user } = userData;

  useEffect(() => {
    function getArticle() {
      fetch(ARTICLES_URL + `/${slug}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setArticle(data.article);
        })
        .catch((err) => {
          setError('Not able to fetch Articles');
        });
    }
    getArticle();
  }, [slug]);

  function getDate(date) {
    let newDate = new Date(date).toISOString().split('T')[0];
    return newDate;
  }
  function handleEdit(slug) {
    props.history.push({
      pathname: `/articles/edit/${slug}`,
      article: article,
    });
  }

  function handleDelete() {
    fetch(ARTICLES_URL + '/' + slug, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage[LOCAL_STORAGE_KEY],
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        props.history.push(`/profiles/${user.username}`);
      })
      .catch((err) => console.log(err));
  }

  if (error) {
    return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
  }
  if (!article) {
    return <Loader />;
  }
  let { tagList } = article;

  return (
    <main>
      {/* hero section */}
      <section className="px-20 bg-gray-400 py-12 md:flex items-center rounded-md shadow-md">
        <div className="flex py-6 items-center flex-col mr-20">
          <Link to={`/profiles/${article.author.username}`}>
            <img
              src={article.author.image || 'smiley.png'}
              alt={article.author.username}
              className="w-16 h-16 object-cover rounded-full"
            />
          </Link>
          <span className="mx-3 text-gray-700 font-bold text-xl">
            {article.author.username}
          </span>
          <span className="mx-3 text-gray-700">
            {getDate(article.createdAt)}
          </span>
        </div>
        <div className="flex flex-col w-5/6">
          <h2 className="mt-2 mb-5 text-4xl self-center text-gray-900">
            {article.title}
          </h2>
          <p className="self-start text-gray-800 mb-5 overflow-hidden w-full">
            {article.description}
          </p>
          <div className="flex justify-between">
            <div className="flex flex-wrap items-center">
              {tagList.map((tag) => {
                if (!tag) {
                  return null;
                } else {
                  return (
                    <span
                      key={tag}
                      className="mr-3 mb-3 bg-gray-700 p-1 px-2 text-xs rounded-md text-white"
                    >
                      {tag}
                    </span>
                  );
                }
              })}
            </div>
            {isLoggedIn && user.username === article.author.username && (
              <div className="flex flex-wrap items-center">
                <span
                  className={
                    'btn bg-gray-300 text-gray-600 rounded-md mx-3 mb-3 cursor-pointer'
                  }
                  onClick={() => handleEdit(article.slug)}
                >
                  <i className="far fa-edit mr-2"></i> Edit
                </span>

                <span
                  className={
                    'btn bg-gray-300 text-gray-600 rounded-md mx-3 mb-3 cursor-pointer'
                  }
                  onClick={handleDelete}
                >
                  <i className="far fa-trash-alt mr-2"></i>Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* article body */}
      <section className="bg-gray-100">
        <div className="text-lg text-gray-700 px-20 py-12 border w-full overflow-hidden">
          {/* <ReactMarkdown children={article.body} remarkPlugins={[remarkGfm]} /> */}
        </div>
        <div className="px-20 py-12">
          <Comments slug={article.slug} />
          {!user && (
            <div className="flex justify-center mt-10 mb-5">
              <h3 className="text-xl text-gray-600">
                Please
                <Link to="/login" className="text-green-700 mx-1">
                  Login
                </Link>
                to Add Comments on the Article
              </h3>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Article;
