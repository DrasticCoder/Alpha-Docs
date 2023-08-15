import {
  BrowserRouter,
  Routes,
  Route,
  redirect
}from 'react-router-dom';

import TextEditor from './components/TextEditor';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" action={()=>{
          return redirect(`/documents/${uuidV4}`)
        }}>
        </Route>
        <Route path="/documents/:id" component={TextEditor} />
      </Routes>
      <TextEditor />
    </BrowserRouter>
  )
}

export default App