'use client'

import { useState } from "react"
import { quiz } from "../data"

export default function Quiz() {
    // Keep track of current displaying question (index)
    const [activeQuestion, setActiveQuestion] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false)
    // Used to determine whether user can navigate to next question or not
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

    // Calculate score and go to next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) => (
            selectedAnswer ? {...prev, score: prev.score + 5, correctAnswers: prev.correctAnswers + 1} : {...prev, wrongAnswers: prev.wrongAnswers + 1}
        ))

        if (activeQuestion != totalQuestions - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }
        setChecked(false);
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
                            {
                                checked ? (<button className="btn"
                                onClick={nextQuestion}
                                >
                                    {
                                        activeQuestion == totalQuestions - 1 ? 'Finish' : 'Next Question'
                                    }
                                </button>) : (
                                    <button disabled className="btn-disabled">
                                        Next Question
                                    </button>
                                )
                            }
                        </div>
                    ) : (<div className="quiz-container center">
                        <h3>Result</h3>
                        <hr />
                        <h3>Overall - {(result.score / 25) * 100}%</h3>
                        <p>Total Questions : <span>{totalQuestions}</span></p>
                        <p>Total Score : <span>{result.score}</span></p>
                        <p>Correct Answers : <span>{result.correctAnswers}</span></p>
                        <p>Wrong Answers : <span>{result.wrongAnswers}</span></p>
                        <button onClick={() => window.location.reload()}>Reset</button>
                    </div>)
                }
            </div>
        </div>
    )
}