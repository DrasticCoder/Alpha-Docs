import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
}from 'react-router-dom';

import TextEditor from './components/TextEditor';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={`/documents${uuidV4}`} />
        </Route>
        <Route path="/documents/:id" component={TextEditor} />
      </Switch>
      <TextEditor />
    </BrowserRouter>
  )
}

export default App
