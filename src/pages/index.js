
import { useEffect, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import data from './data.json';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {
  const notifySucces = () => toast.success('+1');
  const notifyError = () => toast.error('-1');


  const [direction, setDirection] = useState('')
  const [Q, setQ] = useState([])
  const [shuffled, setShuffled] = useState([])

  const [styleOnOne, setStyleOnOne] = useState('')
  const [styleOnTwo, setStyleOnTwo] = useState('')
  const [styleOnThree, setStyleOnThree] = useState('')
  const [styleOnFour, setStyleOnFour] = useState('')

  const [score, setScore] = useState(0)

  const effect = "text-blue-600 font-bold text-4xl"


  const getData = () => {
    const randomData1 = data[Math.floor(Math.random() * data.length)];
    const randomData2 = data[Math.floor(Math.random() * data.length)];
    const randomData3 = data[Math.floor(Math.random() * data.length)];
    const randomData4 = data[Math.floor(Math.random() * data.length)];

    setQ([randomData1, randomData2, randomData3, randomData4])
    console.log(randomData1);
    // shuffle the array of 4 elements of 0,1,2,3
    setShuffled([0, 1, 2, 3].sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
   getData()
  }, [])

  const handleMove = (e) => {
    setDirection(e.direction);
    if (e.direction === 'FORWARD') {
      setStyleOnOne(effect);
      setStyleOnTwo('');
      setStyleOnThree('');
      setStyleOnFour('');
    }
    if (e.direction === 'LEFT') {
      setStyleOnOne('');
      setStyleOnTwo(effect);
      setStyleOnThree('');
      setStyleOnFour('');
    }
    if (e.direction === 'RIGHT') {
      setStyleOnOne('');
      setStyleOnTwo('');
      setStyleOnThree(effect);
      setStyleOnFour('');
    }
    if (e.direction === 'BACKWARD') {
      setStyleOnOne('');
      setStyleOnTwo('');
      setStyleOnThree('');
      setStyleOnFour(effect);
    }
  }

  const reset   = () => {
    setStyleOnOne('')
    setStyleOnTwo('')
    setStyleOnThree('')
    setStyleOnFour('')
    getData()


  }

  const OK = () => {
    notifySucces()
    setScore(score + 1)
    reset()
  }

  const NG = () => {
    notifyError()
    setScore(score - 1)
    reset()
  }

  const handleStop = (e) => {
    console.log(direction, Q[0].id, Q[shuffled[0]], Q[shuffled[1]].id, Q[shuffled[2]].id, Q[shuffled[3]].id);
    if (direction === 'FORWARD') {
      if (Q[shuffled[0]].no === Q[0].no) OK()
      else NG()
    }
    if (direction === 'RIGHT') {
      if (Q[shuffled[1]].no === Q[0].no) OK()
      else NG()
    }
    if (direction === 'BACKWARD') {
      if (Q[shuffled[2]].no === Q[0].no) OK()
      else NG()
    }
    if (direction === 'LEFT') {
      if (Q[shuffled[3]].no === Q[0].no) OK()
      else NG()
    }
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between w-screen `}
    >
      <div className="flex flex-col items-center w-screen ">
        <div className=" flex place-items-center ">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mt-20">{Q[0]?.kanji}</h1>
            <h2 className="text-2xl font-semibold text-center">{Q[0]?.reading}</h2>
          </div>
        </div>

        <div className={`pt-20 text-xl ${styleOnOne}`} >
          {Q[shuffled[0]]?.definition}
        </div>
        <div className="flex flex-row items-center w-screen">
          <div className={`w-full  text-xl text-right ${styleOnTwo}`} >
            {Q[shuffled[3]]?.definition}
          </div>
          <div className='p-10 ' >
            <Joystick move={handleMove} stop={handleStop} />
          </div>
          <div className={`w-full  text-xl ${styleOnThree}`} >
            {Q[shuffled[1]]?.definition}
          </div>
        </div>
        <div className={` text-xl ${styleOnFour}`} >
          {Q[shuffled[2]]?.definition}
        </div>

        <div className="flex flex-col items-center w-screen">
        <h1 className="text-4xl font-bold text-center mt-20">Score: {score}</h1>
      </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />

   

    </main>
  );
}


