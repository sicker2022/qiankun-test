import React, { useMemo, useState } from 'react';

export default function MicroApp({ data = 'No host data', mode = 'qiankun' }) {
  const [count, setCount] = useState(0);
  const cards = useMemo(
    () => [
      { label: 'Framework', value: 'Next.js + React' },
      { label: 'Runtime', value: mode === 'qiankun' ? 'Mounted by qiankun' : 'Standalone' },
      { label: 'Port', value: '8082' }
    ],
    [mode]
  );

  return (
    <main className="next-micro">
      <section className="next-micro__hero">
        <div>
          <p className="next-micro__eyebrow">Next.js Micro App</p>
          <h2>React micro frontend is online</h2>
          <p className="next-micro__copy">
            This view is rendered by a Next.js application and can run inside the qiankun host or by itself.
          </p>
        </div>
        <button className="next-micro__button" type="button" onClick={() => setCount((value) => value + 1)}>
          Clicked {count} times
        </button>
      </section>

      <section className="next-micro__grid">
        {cards.map((card) => (
          <article className="next-micro__card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="next-micro__host">
        <span>Host props</span>
        <strong>{data}</strong>
      </section>
    </main>
  );
}
