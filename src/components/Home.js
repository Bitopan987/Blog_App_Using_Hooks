import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="flex items-center pt-35 px-20 h-screen">
      <div className="flex-1">
        <h2 className="text-5xl  font-bold  text-black">Welcome to Alt Blog</h2>
        <p className="text-2xl py-6  text-gray-600">
          The hassle-free blogging platform for engineers, thought-leaders, and
          the dev community!
        </p>
        <h5 className="text-2xl pb-4  text-gray-700">
          Own Your Content · Share Ideas
        </h5>
        <Link to="/articles">
          <button className="btn-primary pb-3">
            <span className="align-middle">Get Started</span>{' '}
            <i class="ri-arrow-right-s-line align-middle"></i>
          </button>
        </Link>
      </div>
      <div className=" flex-1">
        <img src="/image/blogging.svg"></img>
      </div>
    </div>
  );
}

export default Home;
