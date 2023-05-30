'use client'

import { useState } from "react"
import { quiz } from "../data"

export default function Quiz() {
    // Keep track of current displaying question (index)
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<null | number>(null)
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0
    })

    // destructuring questions
    const {questions, totalQuestions} = quiz
    const {id, question, answers, correctAnswer} = questions[activeQuestion]

    // Select and Check answer.
    const onAnswerSelected = (answer: string, index: number) => {
        setChecked(true);
        setSelectedAnswerIndex(index);

        if (answer === correctAnswer) {
            setSelectedAnswer(true);
        } else {
            setSelectedAnswer(false);
        }
    }

    return (
        <div className="container">
            <h1>Quiz Page</h1>
            <div>
                <h2 className="questions">
                    Question : {activeQuestion + 1}
                    <span>/{totalQuestions}</span>
                </h2>
            </div>
            <div>
                {
                    !showResult ? (
                        <div className="quiz-container">
                            <h3>{question}</h3>
                            {
                                answers.map((answer, index) => (
                                    <li key={index} className={selectedAnswerIndex === index ? 'li-selected' : 'li-hover'}
                                    onClick={() => onAnswerSelected(answer, index)}
                                    >
                                        <span>{answer}</span>
                                    </li>
                                ))
                            }
                        </div>
                    ) : (<div className="quiz-container">ho</div>)
                }
            </div>
        </div>
    )
}