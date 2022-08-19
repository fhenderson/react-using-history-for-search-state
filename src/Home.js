import React from 'react';

const mockData = [
  'test1231',
  'bitbug12312',
  'alkdfjadf',
  'adflkjaidfle',
  'test data',
  'foobar',
];

const useHistory = () => {
  const { pathname, search } = window.location;
  const queryParams = new URLSearchParams(search);
  const [filter, setFilter] = React.useState(queryParams.get('filter') || '');
  return [
    filter,
    function setData(val) {
      setFilter(val);
      queryParams.set('filter', val);
      history.replaceState({}, '', `${pathname}?${queryParams.toString()}`);
    },
  ];
};

const Home = () => {
  const [text, setText] = React.useState('');
  const [filter, setFilter] = useHistory();

  const data = React.useMemo(
    () => (text ? mockData.filter((i) => i.includes(text)) : mockData),
    [text]
  );
  const historyData = React.useMemo(
    () => (filter ? mockData.filter((i) => i.includes(filter)) : mockData),
    [filter]
  );
  const handleStateChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleUrlChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };
  return (
    <div className="app">
      <div className="item">
        <h2> Using State</h2>
        <input value={text} onChange={handleStateChange} />
        <ol>
          {data.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      </div>
      <div className="item">
        <h2> Using U</h2>
        <input value={filter} onChange={handleUrlChange} />
        <ol>
          {historyData.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      </div>
      <button
        onClick={() => {
          window.location.href = window.location.href;
        }}
      >
        refresh page
      </button>
    </div>
  );
};

export default Home;
