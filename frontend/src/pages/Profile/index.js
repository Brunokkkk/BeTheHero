import React, {useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

function Profile(){

  const history = useHistory();
  const[incidents, setIncident] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ong_Id = localStorage.getItem('ongId');
  
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ong_Id,
      }
    }).then(response => {
      setIncident(response.data); 
    })
  }, [ong_Id])

  async function handleDelete(id){
    
    try{

      console.log(ong_Id);
      setIncident(incidents.filter(incident => incident.id !== id));
      await api.delete(`incidents/${id}`,{
        headers: {
          Authorization: ong_Id,
        }
      });
      
    }catch(err){
      alert(err);
    }
  }

  function handleClose(){
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem Vindo, {ongName}</span>

        <Link className="button" to="/newIncident/new">  
          Cadastrar novo caso
        </Link>
        <button onClick={handleClose} type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident =>(
          <li key={incident.id}>
          <strong>CASO: </strong>
          <p>{incident.title}</p>
          <strong>DESCRIÇÃO: </strong>
         <p>{incident.description}</p>
          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

          <button type="button" onClick={() => handleDelete(incident.id)}>
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile;
