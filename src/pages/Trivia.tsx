import { useEffect, useState } from "react";
import { DB, Question } from "../data-providers/Server";
import { Loader } from "../components";
import Modal from "../components/UI/Modal/Modal";
import "./TriviaStyle.css";

const Trivia = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<
    { answer: string; isCorrect: boolean }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    DB.getQuestions().then((questions) => {
      const shuffledQuestions = shuffleArray(questions);
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswers([]);
      setIsLoading(false);
    });
  };

  const shuffleArray = (array: Question[]): Question[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  const handleAnswerClick = (answer: string) => {
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setScore((prevScore) => prevScore + (correct ? 1 : 0));
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { answer, isCorrect: correct },
    ]);
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleFinishGame = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedAnswer(null);
    setShowModal(false);
    loadQuestions();
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (showModal) {
    return (
      <Modal open={showModal}>
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <div className="answer-summary">
              <ul>
                {answers.map((answer, index) => (
                  <li
                    key={index}
                    className={`answer-item ${
                      answer.isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    <span>{answer.answer}: </span>
                    <span className={answer.isCorrect ? "green" : "red"}>
                      {answer.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="center">
              <button onClick={handleModalClose}>Start Again</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <div className="trivia-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="question">
            <h2>{currentQuestion.question}</h2>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${
                    selectedAnswer === option ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {selectedAnswer !== null ? (
            <div className="next-button">
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNextQuestion}>Next Question</button>
              ) : (
                <button onClick={handleFinishGame}>Finish Game</button>
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Trivia;
