// import React, { useState, useEffect } from 'react';
// import './App.css'; // Make sure to import the CSS


import React, { useState, useEffect } from 'react';

const fetchQuestions = async () => {
  const url = 'https://opentdb.com/api.php?amount=2';
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    const url = 'https://opentdb.com/api.php?amount=10';
    try {
      const response = await fetch(url);
      const data = await response.json();
      const formattedData = data.results.map((q) => ({
        ...q,
        allAnswers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
      }));
      setQuestions(formattedData);
      setLoading(false); 
    } catch (error) {
      console.error('Failed to fetch questions', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === questions[currentQuestion].correct_answer);
  };

  if (loading) {
    return <p>Loading questions...</p>; 
  }

  return (
    <div>
      {questions.length > 0 && (
        <div>
          <p>{questions[currentQuestion].question}</p>
          {questions[currentQuestion].allAnswers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswer(answer)}>
              {answer}
            </button>
          ))}
        </div>
      )}
      {selectedAnswer && (
        <p>{isCorrect ? 'Correct!' : 'Wrong!'}</p>
      )}
    </div>
  );
}

export default App;