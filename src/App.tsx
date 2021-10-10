import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import Home from './pages/home/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
