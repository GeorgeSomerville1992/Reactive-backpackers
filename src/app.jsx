var React = require('react');
// var Routes = require('./routes');


console.log('hello this is my main js ting askdjflskaaaa');

var Main = require('./components/main.jsx');
console.log('MAIN',  Main)
// render();
// module.exports = (
//   <Router>
//     <Route path="/" component={Main} >
//     </Route>
//   </Router>
// )

React.render(<Main/>, document.querySelector('.container'));

