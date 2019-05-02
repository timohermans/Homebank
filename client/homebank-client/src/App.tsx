import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route} from 'react-router-dom';
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
          <Route exact path="/" component={Home} />
          <Route path="/budget" component={Budget} />
        </div>
      </Router>
  );
};

export default App;
