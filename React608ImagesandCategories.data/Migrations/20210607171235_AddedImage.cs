using Microsoft.EntityFrameworkCore.Migrations;

namespace React608ImagesandCategories.data.Migrations
{
    public partial class AddedImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Subcategories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: true),
                    FileName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Subcategories_ImageId",
                table: "Subcategories",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategories_Image_ImageId",
                table: "Subcategories",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subcategories_Image_ImageId",
                table: "Subcategories");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Subcategories_ImageId",
                table: "Subcategories");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Subcategories");
        }
    }
}
