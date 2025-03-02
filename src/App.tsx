const App = () => {
  console.log('API URL:', process.env.API_URL);
  return (
    <div className="app-container">
      <h1 className="underline">Hello, Webpack with React and TypeScript!</h1>
      <img src={'/asset/sample.png'} />
    </div>
  );
};

export default App;
