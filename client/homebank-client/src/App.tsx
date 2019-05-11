import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import {Budget} from './budgets/budget/Budget';
import {Home} from './home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/*<ul>*/}
        {/*<li>*/}
        {/*<Link to="/">Home</Link>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*<Link to="/about">About</Link>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*<Link to="/topics">Topics</Link>*/}
        {/*</li>*/}
        {/*</ul>*/}

        {/*<hr />*/}
        <Route exact={true} path="/" component={Home} />
        <Route path="/budget" component={Budget} />
      </div>
    </Router>
  );
};

export default App;
