import { useEffect, useRef, useState } from 'react'
import '../App.css'
import { motion } from "framer-motion";
import Card from "./PostCard";

function App() {
  const [posts, setposts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  async function getData() {
    const skip = (page - 1) * limit;

    let fetchUrl = `https://dummyjson.com/posts`;


    const data = await fetch(fetchUrl).then(res => res.json());
    setposts([...data.posts]);
    setTotal(data.total);
  }

  useEffect(() => {
    getData();
  }, [page, limit]);

  function changePage(pageNumber) {
    setPage(pageNumber);
  }

  const pageCount = Math.ceil(total / limit);

  function handlePrevPage(e) {
    e.preventDefault();
    if ((page - 1) > 0) {
      setPage(page - 1);
    }
  }

  function handleNextPage(e) {
    e.preventDefault();
    if ((page + 1) <= pageCount) {
      setPage(page + 1);
    }
  }

  function handleLimitChange(newLimit) {
    setLimit(newLimit);
    setPage(1);
  }

  return (
    <>
      <form>
        <input onChange={(e) => setSearch(e.target.value)} type="text" />
      </form>
      <motion.div>
        <div className="container">
          {posts.filter((x) => {
            return search.toLocaleLowerCase() === '' ? x : x.title.toLowerCase().includes(search)
          }).map((x, i) => <motion.div className="productItem" key={x.id}>
            <Card text={x.title} body={x.body} reactions={x.reactions} index={i}>
              <h4>{x.title}</h4>
              <p>{x.body}</p>
              <ul>
                <li>{x.reactions.likes}</li>
                <li>{x.reactions.dislikes}</li>
              </ul>
            </Card>
          </motion.div>)}
        </div>
      </motion.div>

      <div className="limit-buttons">
        <button onClick={() => handleLimitChange(10)}>30 page</button>
        <button onClick={() => handleLimitChange(30)}>50 page</button>
      </div>
      {pageCount > 0 &&
        <ul className="pagination">
          <li><a href="#" onClick={handlePrevPage}>&lt;</a></li>
          {
            Array
              .from({ length: pageCount }, (v, i) => (i + 1))
              .map(x => <li key={x}><a href="#" className={page === x ? 'activePage' : ''} onClick={e => { e.preventDefault(); changePage(x); }}>{x}</a></li>)
          }
          <li><a href="#" onClick={handleNextPage}>&gt;</a></li>
        </ul>
      }
    </>
  )
}


export default App
