import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    console.log('is this running')
    return (
        <div className="card-header">Example Component</div>

    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
