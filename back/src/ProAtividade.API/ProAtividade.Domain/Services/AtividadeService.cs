using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
        }
        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if (await _atividadeRepo.PegarPorTituloAsync(model.Titulo) != null)
            {
                throw new Exception("Já existe uma atividade com esse título"); 
            }

            if (await _atividadeRepo.PegarPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model); 
                
                if(await _atividadeRepo.SalvarMudancasAsync())
                {
                    return model; 
                }
            }

            return null; 
        }

        public Task<Atividade> Atualizar(Atividade model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ConcluirAtividade(int AtividadeId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletarAtividade(int AtividadeId)
        {
            throw new NotImplementedException();
        }

        public Task<Atividade> PegarAtividadePorIdAsync(int AtividadeId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Atividade>> PegarTodasAtividadesAsync(Atividade model)
        {
            throw new NotImplementedException();
        }
    }
}
