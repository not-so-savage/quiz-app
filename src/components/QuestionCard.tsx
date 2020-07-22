import React from 'react';
import { Answer } from '../App';
import DOMPurify from 'dompurify';

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
    <div>
        <p className='number'>
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: htmlSanitizer(question)}} />
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: htmlSanitizer(answer) }} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCard;
