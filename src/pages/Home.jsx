import React, { Component } from 'react';
import LayoutHeader from '../layouts/App';

class Home extends Component {
    render() {
        return (
            <LayoutHeader>
                <h2 style={{padding: 10}}>Conteúdo da página inicial</h2>
            </LayoutHeader>
        );
    }
}

export default Home;