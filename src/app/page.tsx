'use client'

import React, {useState, useEffect} from "react"

type APi = {
  title: string;
  image: string;
  id: string;
  val: number;
}
export default function Home() {
    const [array, setArray] = useState<APi[]>([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [fetchData, setFetchData] = useState(true);


  useEffect(() => {
    fetch('https://json-sever-navy.vercel.app/comments')
    .then(response => response.json())
    .then((json) => {
        console.log(json);
        setArray(json);
        setFetchData(false); 
    })
  }, [fetchData])

  const enviarInformacao = () => {
    fetch('https://json-sever-navy.vercel.app/comments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        id:Date.now(),
        title: title,
        image: image
      }),
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      setFetchData(true); 

    })
        setTitle('');
        setImage('');
  }

  const excluirInformacao = (val : APi) => {
        if(val.id === val.id){
          fetch(`https://json-sever-navy.vercel.app/comments/${val.id}`, {
            method: 'DELETE',
      
          })
          .then(response => response.json())
          .then((json) => {
            console.log(json);
            setFetchData(true); 
          })
        }
  }

  const editarInformacao = (/* val : APi */) => {
    alert('Funcionou o botão editar');
  }

  return (
    <main
    className=' text-white'
    >
      
      <input type="text"
      onChange={(e) => setTitle(e.target.value)}
      placeholder='Escreva um título'
      className="text-black"
       />

      <input type="text"
      onChange={(e) => setImage(e.target.value)}
      placeholder='Escreva a url de uma imagem'
      className="text-black"
       />

      <button
      className="text-white"
      onClick={enviarInformacao}
      >
      Enviar informação
      </button>

      <div
      className="flex flex-row flex-wrap"
      >
      {
        array.map((val) => {
          return(
            <div
            key={val.id}
            className='m-4'
            >
              <h1>{val.title}</h1>
              <img src={val.image}
               alt={val.title}
               className='w-96'
                />

                <button
                className="mr-9"
                onClick={() => excluirInformacao(val)}
                >
                  Excluir
                </button>

                <button
                onClick={editarInformacao}
                >
                  Editar
                </button>
            </div>
          )
        })
      }
      </div>
        
    </main>
  )
}
