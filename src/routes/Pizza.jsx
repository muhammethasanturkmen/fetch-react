import { useEffect, useRef, useState } from 'react'
import '../App.css'
import { motion } from "framer-motion";
import Card from "./PizzaCard";

function App() {
  const [recipes, setrecipes] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  async function getData() {
    const skip = (page - 1) * limit;

    const fetchUrl = `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`;

    const data = await fetch(fetchUrl).then(res => res.json());
    setrecipes([...data.recipes]);
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

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <form>
        <input onChange={(e) => setSearch(e.target.value)} type="text" />
      </form>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          {recipes.filter((x) => {
            return search.toLocaleLowerCase() === '' ? x : x.name.toLowerCase().includes(search)
          }).map((x, i) => <motion.div className="productItem" key={x.id} variants={itemVariants}>
              <Card text={x.name} visual={x.image} ingredients={x.ingredients} instructions={x.instructions} index={i}>
              <img src={x.image} />
            <h4>{x.name}</h4>
            <ul>
              <li>{x.ingredients}</li>
            </ul>
            <p>{x.instructions}</p>
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
