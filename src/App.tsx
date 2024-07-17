import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import {getDesignerApi} from './components/Api/api'
import Header from './components/Header/Header.tsx'
import {CommentList} from './components/Main/CommentsList/CommentList.tsx'
import {IssueList} from './components/Main/IssueList/IssueList.tsx'
import {
  Routes,
  Route,
  Link,
  NavLink
} from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* <h1>Vite + React</h1> */}
      <Header/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      {/* <Header/> */}
      <h3>
      <NavLink to='/'>Главная страница</NavLink>
      </h3>
      <h3>
      <NavLink to='/commentList/'>Список комментариев</NavLink>
      </h3>
      <h3>
      <NavLink to='/issueList/'>Статистика задач</NavLink>
      </h3>
      <Routes>
      <Route path='/' element={<Header/>} />
        <Route path='/commentList/' element={<CommentList />} />
        <Route path='/issueList/' element={<IssueList />} />
      </Routes>
    </>
  )
}

export default App
