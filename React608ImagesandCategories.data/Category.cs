using System;
using System.Collections.Generic;
using System.Text;

namespace React608ImagesandCategories.data
{
    public class Category
    {
        public int  Id { get; set; }
        public String Name { get; set; }
        public List<Subcategory> Subcategories { get; set; }
    }
}
