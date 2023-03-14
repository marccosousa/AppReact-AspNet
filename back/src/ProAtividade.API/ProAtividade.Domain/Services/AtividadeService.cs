using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Schema;

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

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model.DataConclusao != null)
            {
                throw new Exception("Não pode atualizar uma atividade já concluída"); 
            }

            if (await _atividadeRepo.PegarPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Atualizar(model);

                if (await _atividadeRepo.SalvarMudancasAsync())
                {
                    return model;
                }
            }
            return null; 
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar(model); 
                return await _atividadeRepo.SalvarMudancasAsync();
            }
            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = _atividadeRepo.PegarPorIdAsync(atividadeId);
            if (atividade == null) throw new Exception("Essa atividade não existe");

            _atividadeRepo.Deletar(atividade);

            return await _atividadeRepo.SalvarMudancasAsync(); 
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await _atividadeRepo.PegarPorIdAsync(atividadeId); 
                if (atividade == null)
                {
                    return null; 
                }

                return atividade; 
            }
            catch (Exception e)
            {

                throw new Exception(e.Message); 
            }
        }

        public async Task<IEnumerable<Atividade>> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.PegarTodasAsync();
                if (atividades == null)
                {
                    return null; 
                }
                return atividades; 
            }
            catch (Exception e)
            {
                throw new Exception(e.Message); 
            }
        }
    }
}
