import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from '../components/Dropdowns'


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  

class UploadImage extends Component {

    fileInputRef = React.createRef();
    descrRef = React.createRef();

    state = {
        categories: [ {
            id: 0,
            name: '',
            subcategories: [{ id: 0,name: '',  categoryid: 0,  imageid: 0 }]
        }],

        selectedcat: 0,
        selectedsubcat:0,
        imgdescr: '',
        filechosen: ''
      }

componentDidMount =async()=> {
    await this.setState({selectedcat: this.props.match.params.catid});
    await this.setState({selectedsubcat: this.props.match.params.subcatid});
    
    const {data} = await axios.get('/api/category/getcat');
    await this.setState({categories: data});
    this.descrRef.current.focus();
    
}

onCatDropdownChange=  e=> {
    this.setState({selectedcat: e.target.value});
}

onSubDropdownChange=e=> {
    this.setState({selectedsubcat: e.target.value});
}

onDescrChange = e => {
    this.setState({ imgdescr: e.target.value });
  }

onFileChange = e => {
    this.setState({ filechosen: e.target.value });
  }

onClickUpload=async()=> {
    const {selectedsubcat} = this.state;
    const file = this.fileInputRef.current.files[0];
    const fileName = file.name;
    const base64File = await toBase64(file);
    const { imgdescr } = this.state;
    await axios.post('/api/category/addimage', {description:imgdescr, base64File, fileName, subcatid:selectedsubcat});
    this.setState({ imgdescr: '' });
    this.fileInputRef.current.value = '';
    this.props.history.push('/');
   
}


    render() { 
        
      const isMissingData =  this.state.selectedsubcat == -1 ||!this.state.filechosen.trim();
        return ( 
         <div>
             <div className="col-md-6 offset-md-3">
                   <h2>Upload an Image</h2>
                    <br/> 

                       <Dropdown 
                       selectedcat= {this.state.selectedcat}
                       selectedsubcat = {this.state.selectedsubcat}
                       categories = {this.state.categories}
                       onCatDropdownChange={this.onCatDropdownChange}
                       onSubDropdownChange={this.onSubDropdownChange}
                       showSubDropDown = {true}
                    />
                     <br/>
                    <input ref={this.fileInputRef} type="file" name="image" className="form-control" onChange={this.onFileChange} />
                    <br/>
                    <input ref={this.descrRef} value={this.state.imgdescr} onChange={this.onDescrChange} type="text" className="form-control" name="description" placeholder="Description of file"></input>
                    <br/>
                    <button disabled ={isMissingData} className='btn btn-primary btn-lg btn-block' onClick={this.onClickUpload}>Upload</button>
               
             </div> 
        </div>
         );
    }
}
 
export default UploadImage;