import { useState, useCallback , useEffect, useRef} from 'react'




function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const [iscopied, setIsCopied] = useState(false);  //add a state variable to track the button click

  // useref hook 
  // iska use reference ke liye krte h
  // for better ui use this hook 
const passwordRef = useRef(null)

  // usecallBack is used for optimise
  // if method run kuch changes ho rha usko optimise kro
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*-_+={}[]`~"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)  //concatenate , appends
    }
    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword]) //can be use or not setPassword no effect use for optimization

  const copyPasswordToClipboard = useCallback(() => {

    passwordRef.current?.select(); //used for user effect where they see the copy context 
    // passwordRef.current?.setSelectionRange(0,8); when we wnat to select under specific range
setIsCopied(true);

// reset the copied state after 2 seconds , optional 
setTimeout(() => setIsCopied(false),2000);

    window.navigator.clipboard.writeText(password) //because we work on core react , react compile to js 
    // there present window object , if we use next.js we use serverSide rendering full code
    // execute on server side, no window object in server side
  }, [password])

  // useeffect hook for kuch bhi changes hoen par 
  // phir se run kardo, when page load, it run first time

useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-4'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 py-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}  //pass the reference 
          />
          <button onClick={copyPasswordToClipboard} 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-md ${isCopied} ' >{iscopied ? "Copied": "Copy"}</button>
        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            
            <input type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer py-2'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />

            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            
            <input 
            type = "checkbox"
            defaultChecked= {numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}/>

            <label htmlFor="numberInput" >Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            
            <input 
            type = "checkbox"
            defaultChecked= {charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}/>

            <label htmlFor="characterInput" >Characters</label>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
