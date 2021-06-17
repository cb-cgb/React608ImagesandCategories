using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace React608ImagesandCategories.data
{
    public class CategoryRepository
    {
        private string _conn;

        public CategoryRepository(string connection)
        {
            _conn = connection;
        }

        public List<Category> GetCategories()
        {
            using (var context = new CategoryContext(_conn))
            {
                return context.Categories.Include(c => c.Subcategories).ThenInclude(s => s.Image).ToList();
            }
        }

        public void AddCategory(Category c)
        {
            using (var context = new CategoryContext(_conn))
            {   
                context.Categories.Add(c);
                context.SaveChanges();
            }
        }

        public void AddSubCategory(Subcategory s)
        {
            using (var context = new CategoryContext(_conn))
            {
                context.Subcategories.Add(s);
                context.SaveChanges();
            }
        }

        public int AddImage(Image i)
        {
            using (var context = new CategoryContext(_conn))
            {
                context.Images.Add(i);
                context.SaveChanges();

                return i.Id;
            }
        }

        public void UpdateImage(Subcategory s)
        {
           using(var context = new CategoryContext(_conn))
            {
                context.Subcategories.Update(s);
                context.SaveChanges();
            }
        }

        public Subcategory GetSubcategory(int id)
        {
            using(var context = new CategoryContext(_conn))
            {
                return context.Subcategories.FirstOrDefault(s=> s.Id ==id);
            }
        }

        public Image GetImage(int imageId)
        {
            using (var context = new CategoryContext(_conn))
            {
                return context.Images.FirstOrDefault(i => i.Id == imageId);
            }
        }

        public List<Subcategory> GetImages(int catId)
        {
            using (var context = new CategoryContext(_conn))
            {
                return context.Subcategories.Include(c=> c.Image).Where(c => c.CategoryId ==catId ).ToList();
            }
        }




    }
}
