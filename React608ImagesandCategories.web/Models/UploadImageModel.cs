using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React608ImagesandCategories.web.Models
{
    public class UploadImageModel
    {
        public string Description { get; set; }
        public string Base64File { get; set; }
        public string FileName { get; set; }
        public int SubcatId { get; set; }
    } 
}
