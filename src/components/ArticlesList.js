import React, { useState, useEffect, useContext } from 'react';
import Articles from './Articles';
import Tags from './Tags';
import Pagination from './Pagination';
import UserContext from '../context/UserContext';
import articlesApi from '../apis/articles';
import FeedNav from './FeedNav';

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
      `?offset=${(activePageIndex - 1) * 10}&limit=${articlesPerPage}` +
      (tagSelected && `&tag=${tagSelected}`);
    try {
      const finalApi =
        selectedFeed === 'global' ? articlesApi.articles : articlesApi.feed;
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
    <main className="px-24 py-16  pt-28 w-full">
      <FeedNav
        isLoggedIn={isLoggedIn}
        selectedFeed={selectedFeed}
        tagSelected={tagSelected}
        setActivePageIndex={setActivePageIndex}
        setTagSelected={setTagSelected}
        setSelectedFeed={setSelectedFeed}
      />

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
