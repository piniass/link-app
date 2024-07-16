import React, { useEffect, useState } from 'react';
import LinkCard from './LinkCard';
import crypto from 'crypto'; 

export default function LinksComponent(props) {
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState('');
  const link = props.link;

  useEffect(() => {
    if (link) {
      // let fecha = Date.now();
      const newCards = link.map((links) => {
        return {
          id: window.crypto.randomUUID(), // Incrementa 'fecha' para asegurar un ID único
          link: links // Asigna el objeto 'links' correcto
        };
      });
      setCards(newCards); // Establecer el nuevo estado de 'cards'
      // console.log("cartas: ", newCards);
    }
  }, [link]);

  const addCard = () => {
    const newCard = { id: Date.now() }; // Puedes personalizar el contenido
    setCards([...cards, newCard]);
  };

  const deleteCard = () => {
    const newCards = cards.filter((card) => card.id !== cardId);
    setCards(newCards);
  };

  useEffect(() => {
    if (cardId) {
      deleteCard();
    }
  }, [cardId]);

  return (
    <section className='bg-white col-span-2 row-span-8 p-7 flex flex-col items-start gap-5'>
      <h1 className='font-bold text-3xl'>Personaliza tus enlaces</h1>
      <p className='text-gray-400'>Añade/elimina/edita tus enlaces aquí debajo y compartelos con el mundo!</p>
      <button onClick={addCard} className='border-2 border-blue-500 text-blue-500 w-full p-4 rounded-md'>+ Añadir nuevo enlace</button>
      <div className='w-full overflow-auto grid grid-cols-1 justify-start gap-4'>
        {cards.map(card => (
          <LinkCard key={card.id} getLinks={props.getLinks} id={card.id} setCardId={setCardId} link={card.link} />
        ))}
      </div>
    </section>
  );
}
