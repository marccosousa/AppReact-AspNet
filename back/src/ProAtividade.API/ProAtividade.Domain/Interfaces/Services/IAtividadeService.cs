using ProAtividade.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AdicionarAtividade(Atividade model);
        Task<Atividade> Atualizar(Atividade model);
        Task<bool> DeletarAtividade(int AtividadeId);
        Task<bool> ConcluirAtividade(int AtividadeId);
        Task<IEnumerable<Atividade>> PegarTodasAtividadesAsync(Atividade model);
        Task<Atividade> PegarAtividadePorIdAsync(int AtividadeId; 
    }
}
