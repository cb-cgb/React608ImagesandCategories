import React from 'react';
import axios from 'axios';

class AddCat extends React.Component {
    state =   { 
        name: ''
    }

    onTextChange = e=> {
        this.setState({name: e.target.value});
    }

    onAdd = async() => {
        await axios.post('/api/category/addcat', this.state.name)
        this.props.history.push('/');
    }

    render() { 
        return (
            <h2>Hello from addcat</h2>
          );
    }
}
 
export default AddCat ;