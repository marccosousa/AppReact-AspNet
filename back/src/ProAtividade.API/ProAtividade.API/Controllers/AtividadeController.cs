using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ProAtividade.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtividadeController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Primeiro método get"; 
        }

        [HttpPost]
        public string Post()
        {
            return "Primeiro método post";
        }

        [HttpPut]
        public string Put()
        {
            return "Primeiro método put";
        }

        [HttpDelete]
        public string Delete()
        {
            return "Primeiro método delete";
        }
    }
}
