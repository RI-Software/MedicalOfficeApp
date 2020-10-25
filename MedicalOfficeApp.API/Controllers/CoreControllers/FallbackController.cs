using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace MedicalOfficeApp.API.Controllers.CoreControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FallbackController : Controller
    {
        public ActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}