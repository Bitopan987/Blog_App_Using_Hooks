import React, { useState, useContext, useEffect } from 'react';
import Loader from './Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
import UserContext from '../context/UserContext';
import articlesApi from '../apis/articles';
import NewComment from './NewComment';

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const userData = useContext(UserContext);
  const { isLoggedIn, user } = userData;
  const navigate = useNavigate();

  const getArticle = async () => {
    try {
      const { data } = await articlesApi.article(slug);
      setArticle(data.article);
    } catch (error) {
      setError('Not able to fetch Articles');
    }
  };
  useEffect(() => {
    getArticle();
  }, [slug]);

  const getDate = (date) => {
    let newDate = new Date(date).toISOString().split('T')[0];
    return newDate;
  };

  const handleEdit = (slug) => {
    navigate(`/articles/edit/${slug}`);
  };

  const handleDelete = async () => {
    try {
      await articlesApi.destroy(slug);
      navigate(`/profiles/${user.username}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <h3 className="text-red-500 text-center text-xl mt-8">{error}</h3>;
  }
  if (!article) {
    return (
      <div className="pt-16">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="px-20 pt-36 bg-gray-50 py-8 md:flex items-center ">
        <div className="flex py-6 items-center flex-col mr-20">
          <Link to={`/profiles/${article.author.username}`}>
            <img
              src={article.author.image || '/image/smiley.jpg'}
              alt={article.author.username}
              className="w-16 h-16 object-cover rounded-full"
            />
          </Link>
          <span className="mx-3 text-gray-700 font-bold text-xl">
            {article.author.username}
          </span>
          <span className="mx-3 text-xs text-gray-700">
            {getDate(article.createdAt)}
          </span>
        </div>
        <div className="flex flex-col ml-20 w-5/6">
          <h2 className="mt-2 self-start mb-5 text-4xl  text-gray-900">
            {article.title}
          </h2>
          <p className="self-start text-gray-500 mb-5 text-sm overflow-hidden w-full">
            {article.description}
          </p>
          <p className="self-start text-gray-800 mb-5 overflow-hidden w-full">
            {article.body}
          </p>
          <div className="flex justify-between">
            <div className="flex flex-wrap items-center">
              {article.tagList.map((tag) => {
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
                  className={'btn-gray  mx-3 mb-3 cursor-pointer'}
                  onClick={() => handleEdit(article.slug)}
                >
                  <i className="far fa-edit mr-2"></i> Edit
                </span>

                <span
                  className={'btn-gray  mx-3 mb-3 cursor-pointer'}
                  onClick={handleDelete}
                >
                  <i className="far fa-trash-alt mr-2"></i>Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="">
        <div className="text-lg text-gray-700 px-20 py-4 w-full overflow-hidden"></div>
        <div className="px-20 ">
          <NewComment slug={article.slug} />
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
    </>
  );
}

export default Article;
