import { useState,useCallback,useEffect,useRef } from 'react'

function App() {

  //the states changing in the App (dependencies) are : password, length, charactersAllowed, numbersAllowed
  const [length,setLength]=useState(8); //default length of the password is kept 8.
  const [numbersAllowed,setNumbersAllowed]=useState(false); //the checkbox for inserting numbers is kept unchecked (false).
  const [charactersAllowed,setCharactersAllowed]=useState(false); //the checkbox for inserting numbers is kept unchecked (false).
  const [password,setPassword]=useState(""); //the default password [on loading the app] is kept empty. 
  const passwordReference=useRef(null); //it uses the hook useRef to store the reference of the element

  //we use useCallback to apply the definition of password generator function as per the dependences.
  const passwordGenerator=useCallback(()=>{

    let password="";
    let usageString="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    //check if numbers is checked
    if(numbersAllowed) usageString+="0123456789";

    //check if special characters are checked
    if(charactersAllowed) usageString+="!@#$%^&*";

    //create a password of a given length by iterating thru the usage-string at random
    for (let index = 1; index <= length; index++) {
      let char=usageString.charAt(Math.floor(Math.random()*usageString.length+1));
      password+=char;
    }

    //we pass the created password to the setPassword useState function
    setPassword(password);

  },[length,numbersAllowed,charactersAllowed,setPassword]);

  //because with every re-render, we want to display the result of set password on the document, we use the hook - useEffect
  //basically, it is used to call generatePassword as in react, we cannot directly call a function like this.
  useEffect(passwordGenerator,[length,numbersAllowed,charactersAllowed,passwordGenerator])

  //in order to optimize our copy function, we use useCallback() with password as dependency - because a new password is generated with every render
  const copyPassword=useCallback(()=>{
    passwordReference.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-2xl font-bold my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full px-3 py-1' placeholder="Password" ref={passwordReference} readOnly />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={15} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}  /><label >length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numbersAllowed} id="numbersAllowedInput" onChange={()=>{setNumbersAllowed((prev)=>!prev)}} /><label>digits</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charactersAllowed} id="charactersAllowedInput" onChange={()=>{setCharactersAllowed((prev)=>!prev)}} /><label>characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
