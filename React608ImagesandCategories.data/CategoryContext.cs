using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace React608ImagesandCategories.data
{
    public class CategoryContext : DbContext
    {
        private string _conn;

        public CategoryContext(string connection)
        {
            _conn = connection;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_conn);
        }

        public DbSet<Category>Categories { get; set; }
        public DbSet<Subcategory>Subcategories { get; set; }
        public DbSet<Image>Images { get; set; }
    }
}
