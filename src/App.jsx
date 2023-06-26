import React, { useState } from "react";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./CharaterSchema.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COPY_ERROR, COPY_SUCCESS } from "./message";

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = () => {
    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify(
        "To generate password you must select at least one checkbox",
        true
      );
    } else {
      let characterList = "";
      if (includeNumbers) {
        characterList = characterList + numbers;
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters;
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters;
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters;
      }
      setPassword(createPassword(characterList));
      notify("Password is generated successfully", false);
    }
  };
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleCopyPassword = (e) => {
    e.preventDefault();
    if (password === "") {
      notify(COPY_ERROR, true);
    } else {
      copyToClipboard(password);
      notify(COPY_SUCCESS);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-cyan-600 to-gray-200 flex items-center justify-center">
      <div className="container bg-[#fdc969d1] max-w-lg rounded-2xl shadow-2xl">
        <div className="flex flex-col p-2">
          <h2 className="text-3xl font-bold text-center mb-4 tracking-wider">
            Password Generator
          </h2>
          <div className="flex flex-row justify-around p-3 gap-5">
            <h3 className=" flex border-2 w-5/6 text-xl rounded-xl items-center justify-center  bg-slate-50 font-RobotoMono">
              {!password ? "Click on generate" : password}
            </h3>
            <button className=" flex flex-row text-md font-semibold border-2 rounded-xl w-1/4 items-center  bg-slate-50 justify-center hover:scale-110 hover:bg-sky-600 hover:text-white transition-all font-Montserrat ">
              <span onClick={handleCopyPassword}>Copy to clipboard</span>
            </button>
          </div>
          <div className="  flex flex-col items-left">
            <div className=" mb-6  flex flex-row items-center justify-around gap-2  p-2 ">
              <label
                className="text-md font-semibold font-Montserrat"
                htmlFor="password-strength"
              >
                Password length
              </label>
              {/*  INPUT CON SELECT NUMBER
              
              
              <input
                className="mt-2 flex h-4 w-20 items-center justify-center rounded-xl border bg-white/0 p-3 text-xl outline-none"
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                type="number"
                id="password-stregth"
                name="password-strength"
                max="26"
                min="8"
              /> */}

              <label className=" bg-slate-50 flex h-4 w-20 font-semibold items-center justify-center rounded-xl border p-3 text-xl outline-none ">
                {passwordLength}
              </label>

              <input
                id="password-strength"
                type="range"
                value={passwordLength}
                name="password-strength"
                max="26"
                min="8"
                className="w-2/4 h-1 bg-gray-200 rounded-xl  appearance-none cursor-pointer dark:bg-gray-500"
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>
            <div className="ml-8 flex gap-3 leading-7 font-RobotoMono">
              <input
                checked={includeUpperCase}
                onChange={(e) => setIncludeUpperCase(e.target.checked)}
                type="checkbox"
                id="uppercase-letters"
                name="uppercase-letters"
                className="peer"
              />

              <label
                className=" peer-checked:font-bold"
                htmlFor="uppercase-letters"
              >
                Add Uppercase Letters
              </label>
            </div>
            <div className="ml-8 flex gap-3 leading-7 font-RobotoMono">
              <input
                checked={includeLowerCase}
                onChange={(e) => setIncludeLowerCase(e.target.checked)}
                type="checkbox"
                id="lowercase-letters"
                name="lowercase-letters"
                className="peer"
              />

              <label
                className=" peer-checked:font-bold"
                htmlFor="lowercase-letters"
              >
                Add Lowercase Letters
              </label>
            </div>
            <div className="ml-8 flex gap-3 leading-7 font-RobotoMono">
              <input
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                type="checkbox"
                id="include-numbers"
                name="include-numbers"
                className="peer"
              />

              <label
                className=" peer-checked:font-bold"
                htmlFor="include-numbers"
              >
                Include Numbers
              </label>
            </div>
            <div className="ml-8 flex flex-row gap-3 leading-7 font-RobotoMono">
              <input
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                type="checkbox"
                id="include-symbols"
                name="include-symbols"
                className="peer"
              />
              <label
                className=" peer-checked:font-bold"
                htmlFor="include-symbols"
              >
                Include Symbols
              </label>
            </div>
          </div>
          <div className="my-6 flex flex-row items-center justify-center  ">
            <button
              className=" flex flex-row text-xl bg-slate-50 font-bold border-2 rounded-2xl w-2/4 items-center justify-center hover:scale-110 hover:bg-sky-600 hover:text-white transition-all font-Montserrat "
              onClick={handleGeneratePassword}
            >
              Generate Password
            </button>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default App;
