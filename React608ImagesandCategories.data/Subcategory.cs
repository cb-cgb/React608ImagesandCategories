using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace React608ImagesandCategories.data
{
    public class Subcategory
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public int CategoryId { get; set; }

        public int ImageId { get; set; }

        [NotMapped]
        public String ImageFileName => Image.FileName;
        [NotMapped]
        public String ImageDescription => Image.Description;

        [JsonIgnore]
        public Category Category { get; set; }

        [JsonIgnore]
        public Image Image { get; set; }
    }
}
