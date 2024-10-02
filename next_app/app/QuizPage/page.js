"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

// Quiz questions and answers
const questions = [
    {
        questionText: "What is the capital of France?",
        answerOptions: [
            { answerText: "Berlin", isCorrect: false },
            { answerText: "Madrid", isCorrect: false },
            { answerText: "Paris", isCorrect: true },
            { answerText: "Rome", isCorrect: false },
        ],
    },
    {
        questionText: "Which planet is known as the Red Planet?",
        answerOptions: [
            { answerText: "Earth", isCorrect: false },
            { answerText: "Mars", isCorrect: true },
            { answerText: "Jupiter", isCorrect: false },
            { answerText: "Saturn", isCorrect: false },
        ],
    },
    {
        questionText: "Who wrote 'Hamlet'?",
        answerOptions: [
            { answerText: "Charles Dickens", isCorrect: false },
            { answerText: "J.K. Rowling", isCorrect: false },
            { answerText: "William Shakespeare", isCorrect: true },
            { answerText: "Leo Tolstoy", isCorrect: false },
        ],
    },
    {
        questionText: "What is the boiling point of water?",
        answerOptions: [
            { answerText: "50°C", isCorrect: false },
            { answerText: "100°C", isCorrect: true },
            { answerText: "200°C", isCorrect: false },
            { answerText: "150°C", isCorrect: false },
        ],
    },
    {
        questionText: "Who is the founder of Microsoft?",
        answerOptions: [
            { answerText: "Steve Jobs", isCorrect: false },
            { answerText: "Bill Gates", isCorrect: true },
            { answerText: "Elon Musk", isCorrect: false },
            { answerText: "Mark Zuckerberg", isCorrect: false },
        ],
    },
];

function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const router = useRouter();

    const handleAnswerOptionClick = (answerText, isCorrect) => {
        // Update score if the answer is correct
        if (isCorrect) {
            setScore(score + 1);
        }
        // Store the selected answer
        setSelectedAnswer(answerText);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setTimeout(() => {
                setSelectedAnswer(null); // Reset selected answer for the next question
                setCurrentQuestion(nextQuestion);
            }, 1000);
        } else {
            setShowResults(true);
        }
    };

    const handleProceedToPayment = () => {
        const totalPayment = score * 2; // Calculate total payment based on correct answers
        router.push(`/payment?amount=${totalPayment}`); // Navigate to PaymentPage with amount as query parameter
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-black">
            <div className="w-full max-w-md p-8 bg-[#3D005B] shadow-lg rounded-3xl">
                {showResults ? (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4 text-[#FFD700]">Congratulations!</h1>
                        <p className="text-lg text-white">
                            You scored {score} out of {questions.length}!
                        </p>
                        <button
                            onClick={handleProceedToPayment}
                            className="mt-6 px-6 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFC700]"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-[#FFD700]">
                            Question {currentQuestion + 1}/{questions.length}
                        </h2>
                        <div className="mb-4">
                            <p className="text-xl mb-2 text-white">
                                {questions[currentQuestion].questionText}
                            </p>
                            <div className="space-y-3">
                                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerOptionClick(answerOption.answerText, answerOption.isCorrect)}
                                        className={`block w-full px-4 py-2 rounded-lg text-left ${
                                            selectedAnswer === answerOption.answerText
                                                ? answerOption.isCorrect
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                                : "bg-gray-200 text-black hover:bg-gray-300"
                                        }`}
                                        disabled={!!selectedAnswer} // Disable buttons after an answer is selected
                                    >
                                        {answerOption.answerText}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizPage;
