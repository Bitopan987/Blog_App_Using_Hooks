import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="text-center  pt-60  h-screen">
      <h2 className="text-5xl font-bold mb-10 text-gray-600">
        Welcome to Alt Blog
      </h2>
      <Link to="/articles">
        <button className=" btn-primary">View Articles</button>
      </Link>
    </div>
  );
}

export default Home;
