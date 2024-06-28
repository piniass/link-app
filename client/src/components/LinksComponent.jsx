import React, { useState } from 'react';
import LinkCard from './LinkCard';

export default function LinksComponent(props) {
  // Estado para almacenar las tarjetas
  const [cards, setCards] = useState([]);

  // Función para agregar una nueva tarjeta
  const addCard = () => {
    const newCard = { id: Date.now() }; // Puedes personalizar el contenido
    setCards([...cards, newCard]);
  };

  const LinkContainer = () => {
    return (
      <div className='w-full overflow-auto grid grid-cols-1 justify-start gap-4'>
        {cards.map(card => (
          <LinkCard key={card.id} getLinks={props.getLinks} />
        ))}
      </div>
    );
  };

  return (
    <section className='bg-white col-span-2 row-span-8 p-7 flex flex-col items-start gap-5'>
      <h1 className='font-bold text-3xl'>Personaliza tus enlaces</h1>
      <p className='text-gray-400'>Añade/elimina/edita tus enlaces aquí debajo y compartelos con el mundo!</p>
      <button onClick={addCard} className='border-2 border-blue-500 text-blue-500 w-full p-4 rounded-md'>+ Añadir nuevo enlace</button>
      <LinkContainer />
    </section>
  );
}
