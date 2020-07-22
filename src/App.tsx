import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';
import { GlobalStyle, Wrapper } from './App.styles';

export type Answer = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionIndex(0);
    setLoading(false);
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const userAnswerValue = event.currentTarget.value;
      const isCorrect = questions[questionIndex].correct_answer === userAnswerValue;
      const userAnswer = {
        question: questions[questionIndex].question,
        answer: userAnswerValue,
        isCorrect: isCorrect,
        correctAnswer: questions[questionIndex].correct_answer
      }
      if(isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
      setUserAnswers(prev => [...prev, userAnswer]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = questionIndex + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionIndex(prev => prev + 1);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>JACK SAV'S QUIZ APP</h1>
        { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <button className='start' onClick={startQuiz}>
                Start
              </button>
        ) : null }

        { !gameOver ? (<p className='score'>Score: {score}</p>
          ) : null }
        
        { loading ? (<p>Loading Questions...</p>
        ) : null }

        { !gameOver && !loading ? (
          <QuestionCard 
          questionNumber={questionIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[questionIndex].question}
          answers={questions[questionIndex].answers}
          userAnswer={userAnswers ? userAnswers[questionIndex] : undefined}
          callback={checkAnswer}
        />
        ) : null }

        { !gameOver && !loading && userAnswers.length === (questionIndex + 1) && (questionIndex + 1) !== TOTAL_QUESTIONS ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null }
      </Wrapper>
    </>
  );
}

export default App;
