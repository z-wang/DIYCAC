/**
 * Created by zihanwang on 8/21/16.
 */
//var App = require('./components/App');
var React = require('react');
var ReactDOM = require('react-dom');
//var AppAPI = require('./utils/appAPI.js');
console.log("hey");
console.log(React);
console.log(ReactDOM);
//ReactDOM.render(
//<App />,
//    document.getElementById('app')
//);
// tutorial1.js
//ReactDOM.render(
//    <h1>Hello, world!</h1>,
//    document.getElementById('example')
//);

// tutorial1.js
// tutorial1-raw.js
var CommentBox = React.createClass({displayName: 'CommentBox',
    render: function() {
        return (
            React.createElement('div', {className: "commentBox"},
                "Hello, world! I am a CommentBox."
            )
        );
    }
});
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('example')
);