'use client';

import { raw } from 'express';
import { useMemo, useState } from 'react'

type domNum = [number, number]

const givenNum:  domNum[]=[[6,1],[4,3],[5,1],[3,4],[1,1],[3,4],[1,2]]

export default function Page() {
  const [num, setNum] = useState<domNum[]>(givenNum)

  const [removeNum, setRemoveNum] = useState("");

  const doubleCount = useMemo(() => num.filter(([a, b]) => a === b ).length, [num])

  const displayNum = useMemo(() => `${num.map(([a, b]) => `[${a},${b}]`).join(", ")}` , [num])

  const sortUp = () => {
    setNum (prev => [...prev].sort((n1, n2) => {
      
      const s1 = n1[0] + n1[1]
      const s2 = n2[0] + n2[1]
      
      if (s1 != s2) return s1 - s2;
      if (n1[0] != n2[0]) return n1[0] - n2[0];

      return n1[1] - n2[1];
      
    }))
  };

  const sortDown = () => {
    setNum (prev => [...prev].sort((n1, n2) => {

      const s1 = n1[0] + n1[1]
      const s2 = n2[0] + n2[1]

      if (s1 != s2) return s2 - s1;
      if (n1[0] != n2[0]) return n2[0] - n1[0];

      return n2[1] - n1[1];

    }))
  }

  const flipAll = () => setNum(prev => prev.map(([a, b]) => [b, a]))

  const DeleteDup = () => {
    setNum(prev => {
      
      const totalisUsed = new Set<number>()
      const target: [number, number] [] = [];
      for (const [a, b] of prev) {
        
        const total = a + b
        const found = totalisUsed.has(total)
        if (!found) {
          totalisUsed.add(total)
          target.push([a, b]);}
      }

      return target
    })
  }

  const resetNum = () => {
    setNum(givenNum)
    setRemoveNum("")
  }

  const deleteTotalNum = () => {
    const raw = removeNum.trim()
    if (raw === "") return;
    const n = Number(raw)
    if (!Number.isFinite(n)) return;
    
    setNum(prev => prev.filter(([a, b]) => a + b !== n))
    setRemoveNum("")
  }

  return (

    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">Dominoes</h1>
      <p className='text-lg text-gray-500' >single page application Dominoes (Take-Home Test)</p>

      <section className='space-y-6 mt-10'>
        <div>
          <p className='mb-2'>Given Dominoes: {displayNum}</p>
          <p className='mb-2'>Count of Double Dominoes: {doubleCount}</p>
        </div>

      </section>

      <section className='space-x-4 mb-6'>
        {num.map(([a, b], index) => (
          <div
            key={index}
            aria-label={`Domino [${a} ${b}]`}
            className='inline-block border border-black rounded-md px-3 py-2'
            title={`[${a} ${b}]`}
          >
            <span>{a}</span>
            <span className='mx-2'>-</span>
            <span>{b}</span>    
          </div>
        ))}

      </section>

      <section className='flex flex-wrap space-y-4'>
        <button
          onClick={sortUp}
          className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'
        >
          Sort Ascending
        </button>

        <button
          onClick={sortDown}
          className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'
        >
          Sort Descending
        </button>

        <button
          onClick={flipAll}
          className='bg-green-500 text-white px-4 py-2 rounded-md mr-2'
        >
          Flip All Dominoes
        </button>

        <button
          onClick={DeleteDup}
          className='bg-red-500 text-white px-4 py-2 rounded-md mr-2'
        >
          Delete Duplicate Totals
        </button>

        <button
          onClick={resetNum}
          className='bg-gray-500 text-white px-4 py-2 rounded-md mr-2'
        >
          Reset
        </button>
        
      </section>

      <section className="space-y-2">
        <input
          value={removeNum}
          onChange={(e) => setRemoveNum(e.target.value)}
          inputMode="numeric"
          placeholder="Input Number"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-900"
        />
        <button onClick={deleteTotalNum} className="border-t-neutral-50">Remove</button>
      </section>

    </main>
  )
}
