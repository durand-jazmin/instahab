import React, { useState } from 'react';

function NavBar({ setSearchTerm }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchText);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="navbar">
            <form onSubmit={handleSearch}>
                <input 
                type="text" 
                placeholder="Buscar fotos..." 
                value={searchText}
                onChange={(e) => setSeatchText(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}

export default NavBar;
