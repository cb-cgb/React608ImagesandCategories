import React from 'react';
function Dropdowns(props){
   
    const {selectedcat, selectedsubcat,categories,onCatDropdownChange,onSubDropdownChange}=props;
    const category= categories.find(c=> c.id==selectedcat);
    const {subcategories}=category || {};

    

        

    return ( 
        <>
        <select value={selectedcat} className="form-control" onChange={onCatDropdownChange}>         
                                  
        <option value="-1">-- Choose Category --</option>
         {categories.map(c=>    
           <option key={c.id} value ={c.id}>{c.name}</option>                      
          )}                    
        </select>                   
       <br/>                   
      
        <select value={selectedsubcat} className="form-control" onChange={onSubDropdownChange}>
         { <option value="-1">-- Choose Sub Category --</option> }                      
            {subcategories && category.subcategories.map(s=>  
                <option key={s.id} value ={s.id}>{s.name}</option>  
           )}                
       </select>                    
       <br/> 

       </>

            );
    
}
 
export default Dropdowns;