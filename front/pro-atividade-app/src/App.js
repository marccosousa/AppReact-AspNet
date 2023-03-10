import {useEffect, useState } from 'react';
import './App.css';
import {Button, Modal} from 'react-bootstrap'
import AtividadeForm from './components/AtividadeForm'
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade'

function App() {

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }

  const deleteAtividade = async (id) => {
        if (await api.delete(`atividade/${id}`)) {
          const atividadesFiltradas = atividades.filter((ativ) => ativ.id !== id);
          setAtividades([...atividadesFiltradas]); 
        }                     
  }

  function pegarAtividade(id) {
        const atividade = atividades.filter((ativ) => ativ.id === id)
        setAtividade(atividade[0]); 
  }

  const atualizarAtividade = async (ativ) => {
      const response = await api.put(`atividade/${ativ.id}`, ativ);
      const { id } = response.data; 
      setAtividades(atividades.map((item) => item.id === id ? response.data : item)); 
      setAtividade({id: 0}); 
  }
  

  function cancelarAtividade() {
      setAtividade({id: 0}); 
  }
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
          <h1 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id: ""}</h1>  
          <Button variant="outline-secondary" onClick={handleShow}>
              <i className="fas fa-plus"></i>
          </Button>
      </div>

      
      <AtividadeLista
          atividades = {atividades}
          deleteAtividade = {deleteAtividade}
          pegarAtividade = {pegarAtividade}
      />

      <Modal show={show} onHide={handleClose}>
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
    </>
  );
}
export default App;
