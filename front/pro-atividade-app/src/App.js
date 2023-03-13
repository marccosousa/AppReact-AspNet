import {useEffect, useState } from 'react';
import './App.css';
import {Button, Modal} from 'react-bootstrap'
import AtividadeForm from './components/AtividadeForm'
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade'

function App() {

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
 
  const handleAtividadeModal = () => {
    setShowAtividadeModal(!showAtividadeModal);
  }

  const handleConfirmModal = (id) => {
    if(id !== 0 & id !== undefined) {
      const atividade = atividades.filter((ativ) => ativ.id === id)
      setAtividade(atividade[0]);
    }
    else {
      setAtividade({id: 0}); 
    }
    
    setSmShowConfirmModal(!smShowConfirmModal); 
  }

  const novaAtividade = () => {
    setAtividade({id: 0});
    handleAtividadeModal();
  }
  const pegarTodasAtividades = async () => {
      const response = await api.get('atividade'); 
      return response.data; 
  }

  useEffect(() => {
      const getAtividades = async () => {
          const todasAtividades = await pegarTodasAtividades(); 
          if (todasAtividades) setAtividades(todasAtividades); 
      }
      getAtividades(); 
  }, [])
  
  const addAtividade = async (ativ) => {
      const response = await api.post('atividade', ativ); 
      setAtividades([...atividades, response.data]);
      handleAtividadeModal();         
  }

  const deleteAtividade = async (id) => {
        handleConfirmModal(0); 
        if (await api.delete(`atividade/${id}`)) {
          const atividadesFiltradas = atividades.filter((ativ) => ativ.id !== id);
          setAtividades([...atividadesFiltradas]); 
        }                     
  }

  function pegarAtividade(id) {
        const atividade = atividades.filter((ativ) => ativ.id === id)
        setAtividade(atividade[0]); 
        handleAtividadeModal(); 
  }

  const atualizarAtividade = async (ativ) => {
      const response = await api.put(`atividade/${ativ.id}`, ativ);
      const { id } = response.data; 
      setAtividades(atividades.map((item) => item.id === id ? response.data : item)); 
      setAtividade({id: 0}); 
      handleAtividadeModal(); 
  }
  

  function cancelarAtividade() {
      setAtividade({id: 0}); 
      handleAtividadeModal(); 
  }
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
          <h1 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id: ""}</h1>  
          <Button variant="outline-secondary" onClick={novaAtividade}>
              <i className="fas fa-plus"></i>
          </Button>
      </div>

      
      <AtividadeLista
          atividades = {atividades}
          pegarAtividade = {pegarAtividade}
          handleConfirmModal = {handleConfirmModal}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
                <h1 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id: ""}</h1> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
              addAtividade = {addAtividade}
              atividadeEscolhida = {atividade}
              atividades = {atividades}
              atualizarAtividade = {atualizarAtividade}
              cancelarAtividade = {cancelarAtividade}
          />
        </Modal.Body>        
      </Modal>

      <Modal show={smShowConfirmModal}
             size = 'sm'>
        <Modal.Header closeButton>
          <Modal.Title>
                Excluindo a atividade {' '}
                Atividade {atividade.id !== 0 ? atividade.id: ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                Tem certeza que deseja excluir a atividade {atividade.id}?
        </Modal.Body>  
        <Modal.Footer>
                <button className="btn btn-outline-success me-2"
                        onClick={() => deleteAtividade(atividade.id)}>
                      <i className="fas fa-check me-2"></i>
                      Sim
                </button>
                <button className="btn btn-outline-danger me-2"
                        onClick={() => handleConfirmModal(0)}>
                      <i className="fas fa-times me-2"></i>
                      Não
                </button>    
        </Modal.Footer>      
      </Modal>
    </>
  );
}
export default App;
