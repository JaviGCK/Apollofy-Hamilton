import { TrendList } from "./components/trendList/TrendList"
import { useEffect, useState } from "react"
function App() {
const [data, setData] = useState([]);
const fetchData = async () => {
  const response = await fetch('http://localhost:3000/playlists');
  const data = await response.json();
  setData(data);
};
useEffect(()=> {
  fetchData();
  console.log(data)
},[]);

  return (
    <>
    <TrendList conjunto={data}/>
    </>
  )
}

export default App
