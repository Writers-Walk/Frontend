import {useState} from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    return (
        <button onClick={handleIncrement}>
        +1 증가 {count}
        </button>
    );
}

export default Counter