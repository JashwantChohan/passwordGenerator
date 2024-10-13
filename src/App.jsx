import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (characterAllowed) str += "~ ` ! @ # $ % ^ & * ( ) _ - + = { } [ ] | \ : ;  ' < > , . ? /"


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full  max-w-2xl mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-200 text-orange-500 text-center'>
        <div className='flex justify-center rounded-lg overflow-hidden mb-4'>
          <h1 className='flex mx-1 my-7 text-4xl text-center font-semibold font-sans'><img className='h-9 my-1 mx-2 rounded-full' src="data:image/png;base64,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" alt="" /> Password Generator </h1>
        </div>

        <div className='flex  transform duration-150 shadow rounded-lg  overflow-hidden mb-7 mx-16 ' >
          <input className=" outline-none w-full py-2 px-3"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipBoard} className='outlune-none bg-blue-700 hover:bg-blue-500 text-white px-3 py-1 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2 justify-center'>
          <div className='flex items-center gap-x-1 mb-5 '>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer '
              onChange={(e) => {
                setlength(e.target.value)
              }}
            />
            <label htmlFor="">length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1 mb-4 '>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput "
              className='cursor-pointer '
              onChange={() => {
                setnumberAllowed((prev) => !prev)
              }}
            />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1 mb-4 '>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="numberInput "
              className='cursor-pointer '
              onChange={() => {
                setcharacterAllowed((prev) => !prev)
              }}
            />
            <label>Character</label>
          </div>


        </div>

      </div>
    </>
  )
}

export default App
