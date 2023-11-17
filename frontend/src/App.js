import axios from 'axios';

function App() {
  const makeAPiRequest = async () => {
    const response = await axios.get('/api/');
    console.log('response', response.data);
  };

  return (
    <div>
        <button
          onClick={makeAPiRequest}
        >
          Make API request
        </button>
    </div>
  );
}

export default App;
