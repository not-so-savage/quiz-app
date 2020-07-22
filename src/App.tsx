import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';

type Answer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.HARD);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={startQuiz}>
              Start
            </button>
      ) : null }

      { !gameOver ? (<p className='score'>Score:</p>
        ) : null }
      
      { loading ? (<p>Loading Questions...</p>
      ) : null }

      { !gameOver && !loading ? (
        <QuestionCard 
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      ) : null }

      <button className='next' onClick={nextQuestion}>
        Next Question
      </button>
      
    </div>
  );
}

export default App;
