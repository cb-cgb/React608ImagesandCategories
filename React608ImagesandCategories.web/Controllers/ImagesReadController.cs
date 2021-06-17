using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace React608ImagesandCategories.web.Controllers
{
    public class ImagesReadController : Controller
    {
        public IActionResult GetImage(string fileName)
        {
            if (fileName == null)
            {
                return null;
            }
            
            if (!System.IO.File.Exists($"uploads/{fileName}")) {
                return null;
            }

            byte[] bytes = System.IO.File.ReadAllBytes($"uploads/{fileName}");
            return File(bytes, "image/jpeg"); ///mime types
        }


    }
}
