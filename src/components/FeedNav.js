function FeedNav(props) {
  const {
    setTagSelected,
    tagSelected,
    setActivePageIndex,
    setSelectedFeed,
    selectedFeed,
    isLoggedIn,
  } = props;
  return (
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
  );
}

export default FeedNav;
