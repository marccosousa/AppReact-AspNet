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
        private readonly IAtividadeRepo _atividade;
        private readonly IGeralRepo _geralRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo, IGeralRepo geralRepo)
        {
            _atividade = atividadeRepo;
            _geralRepo = geralRepo;
        }
        public Task<Atividade> AdicionarAtividade(Atividade model)
        {
            throw new NotImplementedException();
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
