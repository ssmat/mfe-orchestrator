import React from 'react'
import Header from '../components/Header';

const LayoutHeader = ({ children }) => {
    return (
        <div>
            <Header/>
            { children }
        </div>
    );
};

export default LayoutHeader;