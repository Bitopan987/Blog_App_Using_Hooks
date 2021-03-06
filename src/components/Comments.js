import Loader from './Loader';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Comments(props) {
  function getDate(date) {
    let newDate = new Date(date).toISOString().split('T')[0];
    return newDate;
  }

  let userData = useContext(UserContext);
  let { comments } = props;

  const { isLoggedIn } = userData;
  let loggedInUser = userData?.user?.username;
  if (!comments) {
    return <Loader />;
  }
  return (
    <>
      {comments.length ? (
        <h2 className="text-2xl mb-5 text-gray-500 font-bold">Comments</h2>
      ) : (
        ''
      )}
      {comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div
              key={comment.createdAt}
              className="flex item-center pt-4 px-6 bg-gray-100 mb-4 rounded-md relative shadow-md"
            >
              <div className="">
                <img
                  src={comment.author.image || '/image/smiley.jpg'}
                  alt={comment.author.username}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h4 className="text-xl ml-6">{comment.author.username}</h4>
                  <h4 className="text-xl ml-6">{getDate(comment.createdAt)}</h4>
                  {isLoggedIn && loggedInUser === comment.author.username && (
                    <span className="absolute right-4 text-xl">
                      <i
                        className="ri-delete-bin-fill text-red-500"
                        data-id={comment.id}
                        onClick={(e) => props.handleDelete(e)}
                      ></i>
                    </span>
                  )}
                </div>
                <p className="ml-6 my-4">{comment.body}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="text-xl text-red-400">No comments yet!</h2>
      )}
    </>
  );
}

export default Comments;
