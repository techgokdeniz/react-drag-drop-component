import './App.css';
import Dropfile from './components/dropfile';

function App() {

  const onFileChange = (files) => {
    console.log(files);
  }

  return (
    <div className="box">
     <h2 className="header">React Drag and Drop</h2>
      <Dropfile onFileChange={(files) => onFileChange(files)}/>
    </div>
  );
}

export default App;
