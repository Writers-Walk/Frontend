import {useState} from 'react';

function NameInput() {
    const [name, setName] = useState('');

    return (
        <div>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>안녕하세요. {name}님!</p>
        </div>
    );
}

export default NameInput