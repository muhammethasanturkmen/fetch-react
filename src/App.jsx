import { useState } from 'react'
import './App.css'
import Post from './routes/Post'
import Pizza from './routes/Pizza'
import Products from './routes/Products'
import { motion } from "framer-motion";

function App() {
  const [page, setPage] = useState(<Post />);

  return (

    <motion.div
      initial={{ opacity: 0, y: -200 }}  
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 2 }}     
    >
      <div className="container">
        <ul className='nav'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <li><a href="#" onClick={() => setPage(<Post setPage={setPage} />)}>Posts</a></li>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <li><a href="#" onClick={() => setPage(<Pizza setPage={setPage} />)}>Pizza</a></li>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <li><a href="#" onClick={() => setPage(<Products setPage={setPage} />)}>Products</a></li>
          </motion.div>
        </ul>
        <hr />
        {page}
      </div>
    </motion.div>

  )
}


export default App