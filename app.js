// const heading = React.createElement('h1', {id: 'heading'}, 'Hello World from, React!');
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(heading);

// console.log(heading); // This will log a React element object - not an HTML element

/*
How to create nested elements in React
<div id="parent">
    <div id="child">
        <h1>Hello World</h1>
        <h2>This is React</h2>
    </div>
</div>
*/

const nestedElement = React.createElement("div", {id: "parent"},
    React.createElement("div", {id: "child"}, 
        [
            React.createElement("h1", {id: "heading"}, "Hello World"),
            React.createElement("h2", {}, "This is React"),
        ],
        [
            React.createElement("h3", {id: "heading"}, "This is nested h3 element with id heading"),
            React.createElement("h4", {}, "This is nested h4 element"),
        ]
    )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(nestedElement);

// it looks so complicated but in reality its not that complicated. Its just the syntax which is a bit difficult to understand at first glance. But once you get the hang of it, its pretty easy to create elements in React using this method.
// Also, we rarely use this method to create elements in React. We usually use JSX to create elements in React which is much simpler and easier to understand.
// But its important to understand how React.createElement() works under the hood.
// Because when we use JSX, it gets transpiled to React.createElement() calls by Babel. So its important to understand how React.createElement() works to understand how JSX works under the hood.

// Example:
const heading1 = React.createElement("h1", {className: "heading"}, "Hello from heading 1");
const heading3 = React.createElement("h3", {className: "heading"}, "Hello from heading 3");
// This way, we can identify both elements uniquely using their className "heading" without any issues.
// Similarly, we can use data attributes to identify elements uniquely.
const heading2 = React.createElement("h2", {"data-heading": "heading2"}, "Hello from heading 2");
const heading4 = React.createElement("h4", {"data-heading": "heading4"}, "Hello from heading 4");
// This way, we can identify both elements uniquely using their data attributes "data-heading" without any issues.

const root2 = ReactDOM.createRoot(document.getElementById("root"));
root2.render([heading1, heading2, heading3, heading4]);

// Now, let's see how we can create the same nested elements using JSX which is much simpler and easier to understand.
const jsxElement = (
    <div id="parent">
        <div id="child">
            <h1 id="heading">Hello World</h1>
            <h2>This is React</h2>
            <h3 id="heading">This is nested h3 element with id heading</h3>
            <h4>This is nested h4 element</h4>
        </div>
    </div>
);
const root3 = ReactDOM.createRoot(document.getElementById("root"));
root3.render(jsxElement);

