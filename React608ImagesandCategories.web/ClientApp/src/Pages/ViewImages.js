import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from '../components/Dropdowns'


class ViewImages extends Component {

    state = {
        categories: [ {
            id: 0,
            name: '',
            subcategories: [{ id: 0,name: '',  categoryid: 0,  imageid: 0 }]
        }],

        selectedcat: '',
        selectedsubcat: '',
        subcatimages:[{subcatId:0, name:'', imageid:0, description:'', filename:''}]
    
      }

componentDidMount =async()=> {
    
    const {data} = await axios.get('/api/category/getcat');
    await this.setState({categories: data});
       
}

getSubcatImages = async(catId) => {
    const {data} = await axios.get(`/api/category/getsubcatimg/${catId}`);
    console.log(data);
    this.setState({subcatimages: data});
}

onCatDropdownChange= async e=> {
    await this.setState({selectedcat: e.target.value});
    await this.getSubcatImages(this.state.selectedcat);
    console.log(this.state.subcatimages);
}

onSubDropdownChange=e=> {
    this.setState({selectedsubcat: e.target.value});   
}

    render() { 
        const {selectedcat,selectedsubcat,categories,subcatimages}= this.state;    
        //const category= categories.find(c=> c.id==selectedcat);
        // const {subcategories}=category || {};
      
        return ( 
         <div>
             <div className="col-md-6 offset-md-3">
                   <h2>Images </h2>              
                  
                    <br/>      
                    <Dropdown 
                       selectedcat= {this.state.selectedcat}
                       selectedsubcat = {this.state.selectedsubcat}
                       categories = {this.state.categories}
                       onCatDropdownChange={this.onCatDropdownChange}
                       onSubDropdownChange={this.onSubDropdownChange}
                    />                
                    <br/> 
                {selectedcat && 
                    <table className = "table table-bordered table-hover table-striped">
                      <thead>
                        <tr>
                            <th>Image</th>
                            <th>Subcategory</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>                            
                        
                         {subcatimages.map(s=> 
                             <tr key={s.subcatId}>
                                    <td><img src={`/imagesread/getimage?filename=${s.fileName}`} style={{ width: 100 }} /></td>
                                    <td>{s.name}</td>
                                    <td>{s.description}</td>
                                </tr>
                         )}
                        </tbody>
                    </table>    }              
                    
             </div> 
        </div>
         );
    }
}
 
export default ViewImages;