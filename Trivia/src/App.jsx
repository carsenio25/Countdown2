import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const fetchQuestions = async () => {
  const url = 'https://the-trivia-api.com/api/questions?limit=10';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const formattedData = data.map(question => ({
      ...question,
      allAnswers: [question.correctAnswer, ...question.incorrectAnswers].sort(() => Math.random() - 0.5)
    }));
    setQuestions(formattedData);
    setLoading(false);
  } 
  catch (error) {
    console.error('Failed to fetch questions', error);
    setLoading(false);
  }
};


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = 'https://the-trivia-api.com/api/questions?limit=10';
      try {
        const response = await fetch(url);
        const data = await response.json();
        const formattedData = data.map(question => ({
          ...question,
          allAnswers: [question.correctAnswer, ...question.incorrectAnswers].sort(() => Math.random() - 0.5)
        }));
        setQuestions(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch questions', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === questions[currentQuestion].correctAnswer);
  };

  return (
    <div style={{ padding: 20 }}>
      {questions.length > 0 && (
        <Card variant="outlined" style={{ margin: '20px', padding: '20px' }}>
          <Typography variant="h5" component="h2">
            {questions[currentQuestion].question}
          </Typography>
          {questions[currentQuestion].allAnswers.map((answer, index) => (
            <Button
              variant="contained"
              color="primary"
              key={index}
              onClick={() => handleAnswer(answer)}
              style={{ margin: '10px' }}
            >
              {answer}
            </Button>
          ))}
        </Card>
      )}
      {selectedAnswer && (
        <Typography variant="body1" style={{ marginTop: 20 }}>
          {isCorrect ? 'Correct!' : 'Wrong!'}
        </Typography>
      )}
    </div>
  );
}

export default App;