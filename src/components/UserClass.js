import { useState } from "react";

const UserFunction = ({ courseName, desc }) => {
    
    const [count, setCount] = useState(0); // using useState hook to manage state in function component
    
    return (
        <div className="about">
            <h1>User Function Component</h1>
            <h2>count: {count}</h2>
            <h2>Name : {courseName}</h2>
            <p>This is a function component.</p>
            <p>We can use hooks in function components.</p>
            <p>Description: {desc}</p>
        </div>
     );
}

export default UserFunction;