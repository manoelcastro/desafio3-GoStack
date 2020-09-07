import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio ReactJs',
      url: 'http://github.com/desafio-react',
      techs: 'js'
    });
    response.status === 200 ? setRepositories([...repositories, response.data]) : console.log('algo errado')
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if(!response.status === 204) {
      return
    }
    let repos = repositories;

    const index = repos.findIndex(repo => repo.id === id);
    
    repos.splice(index, 1);

        setRepositories([...repos]);
  }



  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={ repository.id }>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
