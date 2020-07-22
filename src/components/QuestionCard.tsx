import React from 'react';
import { type } from 'os';

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => (
    <div>
        <p className='number'>
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}} />
        <div>
            {answers.map(answer => (
                <div>
                    <button disabled={userAnswer}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))};
        </div>;
    </div>
);

export default QuestionCard;