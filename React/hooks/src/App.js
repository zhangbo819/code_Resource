import React, { useState } from 'react';

function FruitList({ fruits, onSetFruit }) {
  return <ul>
    {fruits.map(f => <li key={f} onClick={() => { onSetFruit(f) }}>{f}</li>)}
  </ul>
}

export default function HooksApp() {
  const [fruit, setFruit] = useState('');
  const [fruits, setFruits] = useState(['香蕉', '苹果', '草莓']);
  const [aaa, setAaa] = useState({ a: 1, b: 2 })

  // console.log('setFruit', setFruit)

  return (
    <div>
      <p>{fruit === '' ? '请选择喜爱的水果' : '你选择的是：' + fruit}</p>

      <FruitList fruits={fruits} onSetFruit={setFruit} />

      <p onClick={() => { setAaa({ a: aaa.a + 1 }) }}>{aaa.a}</p>
      <p>{aaa.b}</p>
    </div>
  );
}

