import React, { Component } from 'react';
import axios from 'axios';
import CategoryRow from '../components/CategoryRow';
import { produce } from 'immer';


class Home extends Component {
  state = {  
     categories: [ {
         id: 0,
         name: '',
         subcategories: [{ id: 0,name: '',  categoryId: 0,  imageId: 0 ,imgfilename:''}],
         showsubtable:true,
         newsubcatname:''
     }],
    categoryname: '',
    idstoaddsub: [{cid:0}] ,
    //filename: '', //used for updateImageFileName approach, not currntly being used. 
    subcatimages:[{subcatId:0, name:'', imageid:0, description:'', filename:''}]    
  }  

  componentDidMount = async() => {
    await this.refreshCategories();
  }  

  refreshCategories = async() => {
    const {data} = await axios.get('/api/category/getcat');
    await this.setState({categories: data});
    //await this.updateImageFileName();
  }

  getSubcatImages = async(catId) => {
    const {data} = await axios.get(`/api/category/getsubcatimg/${catId}`);
    this.setState({subcatimages: data});
  }

  /* --not using this. Instead, using getSubcatImages()
     --add a "imgfilename" prop to each subcategory . This is for displaying the image on each subcat row in CategoryRow.js. 
   
  updateImageFileName = async() => { 
     //const nextState =   produce(this.state, draft=> {
     const {categories} =  this.state;

      categories.map( c=> {
          console.log(c.name);
           c.subcategories.map(async s=> {
             console.log(`trying to set image for subcategory ${s.name}`)    
             console.log(c.subcategories);
              c.subcategories[s.Id] = {...s,  imgfilename:''}  ; 
                await this.getImgFileName(s.imageId );
                 s.imgfilename = this.state.filename; 
              })      
        })
        this.setState({categories});
     // })
    //  this.setState(nextState);
    }

  getImgFileName =async(imageId)=> {
    console.log(`in getImgFileName imageId: ${imageId}`);
    const {data} = await axios.get(`/api/category/getimage/${imageId}`);
    this.setState({ filename: data.fileName });
    console.log(this.state.filename);
  } */

  onTextChange = e => {
    this.setState({categoryname: e.target.value});
  }
  onTextChangeSub = async(e,id)=> {
    //await this.setState({subcategoryname: e.target.value});
    const nextState =  produce(this.state, draft=> { 
      const obj = draft.categories.find(i=> i.id===id);
      obj.newsubcatname=e.target.value;     
  })
    await this.setState(nextState);
    await this.addId(id);    
  }

  addId =(id)=> {
    const {newsubcatname} = this.state.categories.find(c=> c.id===id);
    const ids= [...this.state.idstoaddsub, id];
   
    newsubcatname ?  this.setState({idstoaddsub:ids}) : this.removeId(id); //this allows to enable/disable the "add subcategory button"    
  }

  removeId =(id)=> {
    this.setState({idstoaddsub: this.state.idstoaddsub.filter(cid => cid !== id)});       
  }

  onClickAdd = async() => {
    await axios.post('/api/category/addcat', {name: this.state.categoryname})
    this.setState({categoryname:''})
    this.refreshCategories();
  }

  onClickAddSub = async(id) => {
    const {newsubcatname}  = this.state.categories.find(c=> c.id===id);
    await axios.post('/api/category/addsubcat', {name: newsubcatname, categoryId:id})
    await this.removeId(id);

   // this.setState({subcategoryname:''});   
    const nextState =  produce(this.state, draft=> { 
     const obj = draft.categories.find(i=> i.id===id);
     obj.newsubcatname='';         
    })
   this.setState(nextState);

    await this.refreshCategories();
  }
  
  onClickViewSub = async(id) => { 
    const nextState =  produce(this.state, draft=> { 
      const obj = draft.categories.find(i=> i.id===id);
      obj.showsubtable=!obj.showsubtable;      
     
    })
    this.setState(nextState);
    await this.getSubcatImages(id);   
  }
  
  render() { 
      
    return ( 
     
      <div className = "container" style={{margintop:30}}>
        <h2 style={{textAlign: 'center'}}>Categories</h2>
        
        <div className = "row" style = {{marginTop: 20}}>                      
              <div className="col-md-3">
                <input type="text" className="form-control" placeholder="Category Name" style={{width:200}}
                     value={this.state.categoryname}
                     onChange={this.onTextChange}
                    />        
              </div>
              <button disabled={!this.state.categoryname.length>0} className="btn btn-success" onClick={this.onClickAdd}>Add Category</button>
        </div>

       {this.state.categories.length===0  && <h3>Loading...</h3>}

       {this.state.categories.length > 0 &&
        <table className="table table-hover table-bordered table-striped" style ={{marginTop: 10}}>
         <thead>
           <tr>
            <th>Action</th>
            <th>Name</th>
            <th></th>
           </tr>
          </thead>
          <tbody>
            {this.state.categories.map(c=> 
              //{  console.log({c});
               //return (
               <CategoryRow key={c.id} category={c} 
                 onTextChangeSub = {(e)=>this.onTextChangeSub(e,c.id)}
                 onClickAddSub = {()=> this.onClickAddSub(c.id)}
                 onClickViewSub = {()=> this.onClickViewSub(c.id)}
                 addSub = {this.state.idstoaddsub.includes(c.id)}
                 //subCatName = {this.state.subcategoryname}
                 subcatimages = {this.state.subcatimages}
                 
               /> //)}
              )}               
          </tbody>
         </table>
        }
      
    </div>
    

     ); 
  }
}
 
export default Home;