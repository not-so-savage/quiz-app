import React from 'react';
import { type } from 'os';

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswerInfo: any;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswerInfo, questionNumber, totalQuestions }) => (
    <div>
        <p className='number'>
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}} />
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswerInfo} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCard;
