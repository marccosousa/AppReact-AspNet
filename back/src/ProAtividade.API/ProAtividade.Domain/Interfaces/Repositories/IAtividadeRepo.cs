using ProAtividade.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo : IGeralRepo
    {
        Task<IEnumerable<Atividade>> PegarTodasAsync();
        Task<Atividade> PegarPorIdAsync(int atividadeId);
        Task<Atividade> PegarPorTituloAsync(string? titulo);
    }
}
