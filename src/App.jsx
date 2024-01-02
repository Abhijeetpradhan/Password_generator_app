import { useState, useCallback, useEffect , useRef } from "react";
import "./App.css";

function App() {
  const [color,setColor] = useState("yellow");
  const [length, setLength] = useState("0");
  const [isNumberAllowed, setNumber] = useState(false);
  const [isSpecialCharAllowed, setSpecialCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generateRandomPassword = useCallback(() => {
    let pswd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) {
      str += "0123456789";
    }

    if (isSpecialCharAllowed) {
      str += "`~!@#$%^&*(){}[]|'?><";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pswd += str.charAt(char);
    }

    setPassword(pswd);
  }, [length, isNumberAllowed, isSpecialCharAllowed]);


  const copyToclipboard = (()=>{
    // passwordRef.current?.setSelectionRange(0,6)
    setColor("blue")
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    
  })

  useEffect(() => {
    generateRandomPassword();
  }, [length, isNumberAllowed, isSpecialCharAllowed, generateRandomPassword]);

  return (
    <>
      <h1 className="text-3xl text-white p-4">Password Generator</h1>
      <div className="w-full h-56 bg-slate-500 p-5 rounded-3xl">
        <input
          type="text"
          placeholder="password"
          value={password}
          readOnly
          className="outline-none p-2 w-1/2 rounded-3xl"
          ref={passwordRef}
        />
        <button className="text-black p-2 rounded-3xl" style={{backgroundColor:color}} onClick={copyToclipboard}>Copy</button>

        <div className="flex justify-center p-2">
          <input
            type="range"
            value={length}
            min={0}
            max={100}
            onChange={(e) => {
              setLength(e.target.value);
            }}

            className="cursor-pointer"
          />
          <label className="text-white">Length {length}</label>

          <div className="mx-3">
            <input type="checkbox" defaultChecked={isNumberAllowed} onChange={()=>{setNumber((prev)=>!prev)}} />
            <label className="text-white text-lg">Numbers</label>
          </div>

          <div>
            <input type="checkbox" defaultChecked={isSpecialCharAllowed} onChange={()=>{setSpecialCharacter((prev)=>!prev)}}/>
            <label className="text-white text-lg">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
