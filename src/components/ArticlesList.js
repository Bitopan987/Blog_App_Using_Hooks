import React, { useState, useEffect, useContext } from 'react';
import Articles from './Articles';
import Tags from './Tags';
import Pagination from './Pagination';
import UserContext from '../context/UserContext';
import articlesApi from '../apis/articles';

function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState('');
  const [articlesCount, setArticlesCount] = useState(0);
  const [articlesPerPage] = useState(10);
  const [activePageIndex, setActivePageIndex] = useState(1);
  const [tagSelected, setTagSelected] = useState('');
  const [selectedFeed, setSelectedFeed] = useState('global');
  const userData = useContext(UserContext);
  const { isLoggedIn } = userData;

  const getArticles = async () => {
    const query =
      `/?offset=${(activePageIndex - 1) * 10}&limit=${articlesPerPage}` +
      (tagSelected && `&tag=${tagSelected}`);
    try {
      const finalApi =
        selectedFeed == 'global' ? articlesApi.articles : articlesApi.feed;
      const { data } = await finalApi(query);
      setArticles(data.articles);
      setArticlesCount(data.articlesCount);
    } catch (error) {
      setError('Not able to fetch Articles');
    }
  };

  useEffect(() => {
    getArticles();
  }, [activePageIndex, articlesPerPage, tagSelected, selectedFeed]);

  const updateCurrentPageIndex = (index) => {
    setActivePageIndex(index);
    setTagSelected('');
  };

  const selectTag = ({ target }) => {
    let { value } = target.dataset;
    setTagSelected(value);
    setActivePageIndex(1);
    setSelectedFeed('global');
  };

  const handleFavorite = async ({ target }) => {
    let { id, slug } = target.dataset;
    const finalApi =
      id === 'false' ? articlesApi.addFavourite : articlesApi.removeFavourite;
    try {
      await finalApi(slug);
      getArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="px-24 py-16 w-full">
      <div className="flex mb-3">
        <span
          className={
            selectedFeed === 'global'
              ? 'cursor-pointer mr-8 text-xl text-green-500'
              : 'cursor-pointer mr-8 text-xl text-gray-600'
          }
          onClick={() => {
            setTagSelected('');
            setSelectedFeed('global');
          }}
        >
          <i className="fas fa-newspaper mr-2"></i>
          Global Feed
        </span>
        {isLoggedIn && (
          <span
            className={
              selectedFeed === 'personal'
                ? 'text-xl mr-8 cursor-pointer text-green-500'
                : 'text-xl  cursor-pointer text-gray-600'
            }
            onClick={() => {
              setTagSelected('');
              setSelectedFeed('personal');
              setActivePageIndex(1);
            }}
          >
            {' '}
            <i className="fas fa-newspaper mr-2"></i>
            My feed
          </span>
        )}

        {tagSelected && (
          <div className="text-xl">
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-green-700">#{tagSelected}</span>
          </div>
        )}
      </div>

      <section className="flex justify-between ">
        <div className="w-4/6">
          <Articles
            articles={articles}
            error={error}
            handleFavorite={handleFavorite}
          />
        </div>

        <div className="w-80">
          <Tags selectTag={selectTag} />
        </div>
      </section>
      <div className="mt-10">
        <Pagination
          articlesCount={articlesCount}
          articlesPerPage={articlesPerPage}
          activePageIndex={activePageIndex}
          updateCurrentPageIndex={updateCurrentPageIndex}
        />
      </div>
    </main>
  );
}

export default ArticlesList;
