using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React608ImagesandCategories.data;
using Microsoft.Extensions.Configuration;
using React608ImagesandCategories.web.Models;
using System.IO;

namespace React608ImagesandCategories.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private string _conn;

        public CategoryController(IConfiguration c)
        {
            _conn = c.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getcat")]
        public List<Category>GetCategories()
        {
            var db = new CategoryRepository(_conn);
            return db.GetCategories();
        }

        [HttpPost]
        [Route("addcat")]
        public void AddCategory(Category c)
        {
            var db = new CategoryRepository(_conn);
            db.AddCategory(c);
        }

        [HttpPost]
        [Route("addsubcat")]
        public void AddSubCategory(Subcategory c)
        {
            
            var db = new CategoryRepository(_conn);
            c.ImageId = 1;
            db.AddSubCategory(c);
        }

        [HttpPost]
        [Route("addimage")]
        public void AddImage(UploadImageModel image)
        {
            int firstComma = image.Base64File.IndexOf(',');
            string base64 = image.Base64File.Substring(firstComma + 1);
            byte[] fileContents = Convert.FromBase64String(base64);

            Guid g = Guid.NewGuid();
            var ext = Path.GetExtension(image.FileName);
            var fileName = $"{g}{ext}";
            System.IO.File.WriteAllBytes($"uploads/{fileName}", fileContents);

            var repo = new CategoryRepository(_conn);
            var imageId =   repo.AddImage(new Image
                     {
                          Description = image.Description,
                         FileName = fileName
                        });

            var subcat = repo.GetSubcategory(image.SubcatId);
            subcat.ImageId = imageId;
            UpdateImage(subcat);
        }

        [HttpPost]
        [Route("updateimage")]
        public void UpdateImage(Subcategory s)
        {
            var db = new CategoryRepository(_conn);
            db.UpdateImage(s);
        }

       

        

    }
}
