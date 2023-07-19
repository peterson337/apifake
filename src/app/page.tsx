'use client'

import React, {useState, useEffect} from "react"

type APi = {
  title: string;
  image: string;
  id: string;
}
export default function Home() {
    const [array, setArray] = useState<APi[]>([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');


  useEffect(() => {
    fetch('https://apifake.vercel.app/')
    .then(response => response.json())
    .then((json) => {
        console.log(json);
        setArray(json);
    })
  }, [])

  const enviarInformacao = () => {
    fetch('https://apifake.vercel.app/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        id:7,
        title: title,
        image: image
      }),
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json);

    })
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
            </div>
          )
        })
      }
      </div>
        
    </main>
  )
}
