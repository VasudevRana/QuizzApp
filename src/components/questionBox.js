import React, { useState } from 'react';


const QuestionBox = ({ question, options, selected }) => {
    const [answer,setAnswer] = useState(options);
    return (
        <div>
            <div className="questionBox">{question}</div>
            {answer.map((text, index) => (
                <button
                    key={index}
                    className="answerBtn"
                    onClick={() => {
                         //setAnswer();
                        selected(text);
                    }}
                >{text}
                </button>
            ))}
        </div>
    )
}

export default QuestionBox;
