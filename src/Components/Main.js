import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { API_KEY } from './secret';

function Main() {
  let [ques, setQues] = useState({});
  const [curText, setCurText] = useState('');
  const [toggle, setToggle] = useState(true);
  let getData = async () => {
    let data = await axios.get('https://api.api-ninjas.com/v1/trivia',
      {
        headers: {
          'X-Api-Key': API_KEY
        }
      });
    setQues(...data.data);
  }
  useEffect(() => {
    getData();
  }, [toggle])


  let handleChange = (e) => {
    setCurText(e.target.value);
  }

  let handleSumbit = (answer) => {
    toast(curText.toLowerCase() === answer.toLowerCase() ? 'Correct Answer😎' : (!curText ? 'Please enter a valid answer😒' : 'Wrong Answer 😜')
      , {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    if (curText) setToggle(!toggle);
    setCurText('');
  }

  return (
    <>
      <div className="main-content">
        <h1>{ques.question}</h1>
        <input type="text" className="form__input" id="name" placeholder="Enter your answer" required="" value={curText} onChange={handleChange} />
        <button className="btn btn-danger" style={{ marginTop: '10px' }} onClick={() => handleSumbit(ques.answer)}>Submit</button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

export default Main