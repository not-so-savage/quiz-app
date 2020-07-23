import React from 'react';
import { Answer } from '../App';
import DOMPurify from 'dompurify';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: Answer | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const htmlSanitizer = DOMPurify.sanitize;

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => (
    <Wrapper>
        <p className='number'>
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: htmlSanitizer(question)}} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper
                    key={answer}
                    isCorrect={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                        <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: htmlSanitizer(answer) }} />
                        </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;
