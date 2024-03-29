﻿using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;

namespace ProAtividade.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades; 
        }
        
        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(atividade => atividade.Id == id); 
        }

        [HttpPost]
        public Atividade Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);
            if (_context.SaveChanges() > 0)
                return atividade;
            else
                throw new Exception("Você não conseguiu inserir"); 
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id) throw new Exception("Você está tentando atualizar a atividade errada"); 

            _context.Update(atividade);
            if (_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(atividade => atividade.Id == id);
            else
                return new Atividade();
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(atividade => atividade.Id == id);
            if (atividade == null)
                throw new Exception("Essa atividade não existe");
            
            _context.Remove(atividade);
            return _context.SaveChanges() > 0; 
        }
    }
}
