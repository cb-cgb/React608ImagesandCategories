import React from 'react';
import { Link } from 'react-router-dom';

function CategoryRow (props)   {
  const{id,name, subcategories,showsubtable,newsubcatname} = props.category;
  console.log(newsubcatname);
  const {onClickAddSub,onTextChangeSub, onClickViewSub,addSub}= props;
  const subcatexists = subcategories.length > 0;
   
        return ( 
         <>
         <tr>
             <td>
                 {!subcatexists && 
                  <span style={{color: 'red' , fontSize:12}}>No subcategories found</span>
                 }

                 {subcatexists &&<button className="btn btn-link success" onClick={onClickViewSub}>View Sub Categories</button>}
             </td>
             <td>{name}</td>
             <td>
                
                   <div className="row">
                     <div className="col-md-6">
                       <input value={newsubcatname} type="text" className="form-control" placeholder="Enter Subcategory Name" 
                          onChange={onTextChangeSub} />  
                      </div>
                    <div className="col-md-6">
                      <button disabled={!addSub} className="btn btn-link info" onClick={onClickAddSub}>Add Sub Category</button>
                    </div>
                  </div>    
                 
             </td>
         </tr>
         
         {showsubtable &&
        <tr>
          <td colSpan="4">
             <table className="table table-hover table-striped table-bordered">
               <thead>
                  <tr>
                      <th>Subcategory</th>
                      <th>Image</th>
                      <th>Action</th>                     
                  </tr>
                </thead>
                <tbody>
                   
                     {subcategories.map(s=> 
                       <tr key={s.id}>                      
                       <td>{s.name}</td>
                       <td>
                          <img src={`/imagesread/getimage?filename=${s.imageFileName}`} style={{ width: 50 }} />
                       </td>
                       <td>
                           <Link to={`/uplimg/${id}, ${s.id}`}>
                               <button className="btn btn-primary" >Upload Image</button>
                           </Link>
                       </td>
                     </tr>               
                     )}
                </tbody>
              </table>
            </td>
           </tr> 
}  
           
</>
        
               
       

            
        
         );
    
}
 
export default CategoryRow ;
