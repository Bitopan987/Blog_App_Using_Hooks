import React, { useState, useEffect, useContext } from 'react';
import Loader from './Loader';
import { ARTICLES_URL, PROFILE_URL } from '../apis/urls';
import LOCAL_STORAGE_KEY from '../utils/constants';
import Articles from './Articles';
import Pagination from './Pagination';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import profileApi from '../apis/profile';
import 'remixicon/fonts/remixicon.css';

function Profile(props) {
  const [user, setUser] = useState('');
  const [articles, setArticles] = useState(null);
  const [articlesCount, setArticlesCount] = useState(null);
  const [articlesPerPage, setArticlesPerPage] = useState(10);
  const [activePageIndex, setActivePageIndex] = useState(1);
  const [feedSelected, setFeedSelected] = useState('author');
  const [following, setFollowing] = useState('');
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [error, setError] = useState('');

  const userData = useContext(UserContext);
  const { isLoggedIn } = userData;
  const { id } = useParams();

  useEffect(() => {
    const getUserInfo = async (id) => {
      try {
        const { data } = await profileApi.profile(id);
        let profile = data.profile;
        setUser(profile);
        setFollowing(profile.following);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo(id);
  }, [id]);

  var feedUser = user.username;

  useEffect(() => {
    let offset = (activePageIndex - 1) * 10;
    const query = `?${feedSelected}=${feedUser}&limit=${articlesPerPage}&offset=${offset}`;
    const getArticle = async () => {
      try {
        const { data } = await profileApi.articles(query);
        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      } catch (error) {
        setError('Not able to fetch Articles');
      }
    };
    getArticle(query);
  }, [feedUser, feedSelected, activePageIndex, articlesPerPage, favoriteCount]);

  const handleClick = ({ target }) => {
    let { id } = target.dataset;
    setActivePageIndex(id);
    //...state
  };

  const updateCurrentPageIndex = (index) => {
    setActivePageIndex(index);
  };

  const handleFollow = async () => {
    let { username } = user;
    try {
      const finalApi = following ? profileApi.follow : profileApi.unfollow;
      const { profile } = await finalApi(username);
      setFollowing(profile.following);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async ({ target }) => {
    let { id, slug, count } = target.dataset;
    const finalApi =
      id === 'false' ? profileApi.addFavourite : profileApi.removeFavourite;
    try {
      const { data } = await finalApi(slug);
      setFavoriteCount(favoriteCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="pt-16">
        <Loader />
      </div>
    );
  }
  const { username, image, bio } = user;
  const loggedInUser = userData?.user?.username;

  return (
    <main>
      <section className="pt-16">
        <div className="bg-indigo-100 text-white py-16 mt-0 text-center">
          <img
            src={image || '/image/smiley.jpg'}
            alt={username}
            className="w-36 h-36 rounded-full mx-auto"
          />
          <h2 className="text-4xl my-4 uppercase text-gray-700">{username}</h2>
          <h3 className="text-2xl text-gray-500 mb-5">{bio}</h3>
          <div className="float-right mr-10 ">
            {loggedInUser && loggedInUser !== username && (
              <button
                className="bg-gray-200 text-gray-700 btn rounded-full hover:bg-gray-300 transform transition duration-500 hover:scale-105"
                onClick={handleFollow}
              >
                <i
                  className={
                    !following
                      ? 'ri-add-circle-fill  mr-2'
                      : 'ri-subtract-line mr-2'
                  }
                ></i>
                {!following ? 'follow' : 'unfollow'}
              </button>
            )}

            {loggedInUser && loggedInUser === username && (
              <Link to="/settings" className=" btn-gray py-2">
                <i className="ri-edit-box-fill text-gray-600 mr-2 "></i>
                Edit Profile
              </Link>
            )}
          </div>
        </div>

        <article className="px-40">
          <div className="py-6">
            <span
              className={
                feedSelected === 'author'
                  ? 'cursor-pointer text-xl text-green-500 pb-1 border-b-2 border-green-500'
                  : 'cursor-pointer text-xl text-gray-700'
              }
              onClick={() => {
                setFeedSelected('author');
                setActivePageIndex(1);
                // state
                // getFeedArticles();
              }}
            >
              <i className="fas fa-newspaper mr-2"></i>
              Articles written
            </span>
            <span className="mx-4">/</span>
            <span
              className={
                feedSelected === 'favorited'
                  ? 'cursor-pointer text-lg text-green-500 pb-1 border-b-2 border-green-500'
                  : 'cursor-pointer text-lg text-gray-600'
              }
              onClick={() => {
                setFeedSelected('favorited');
                setActivePageIndex(1);
                // getFeedArticles();
              }}
            >
              <i className="ri-article-line mr-1 text-base"></i>
              Favorited
            </span>
          </div>
          <div className="">
            <Articles
              articles={articles}
              error={error}
              isLoggedIn={isLoggedIn}
              handleFavorite={handleFavorite}
            />
          </div>
        </article>
        <div className="text-center py-8 flex justify-center">
          <Pagination
            articlesCount={articlesCount}
            articlesPerPage={articlesPerPage}
            activePageIndex={activePageIndex}
            handleClick={handleClick}
            updateCurrentPageIndex={updateCurrentPageIndex}
          />
        </div>
      </section>
    </main>
  );
}

export default Profile;
