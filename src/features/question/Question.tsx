import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  LinearProgress,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";
import {
  incrementCorrectAnswers,
  resetCorrectAnswers,
  selectQuestions,
  selectCorrectAnswers,
  selectTimeLeft,
  setTimeLeft,
  setCurrentQuestionIndex,
  selectTestingStarted,
  setTestingStarted,
  setShowResults,
  selectShowResults,
  selectCurrentQuestionIndex,
} from "./questionSlice";
import Results from "../../components/Result";

const Question = () => {
  const questions = useSelector(selectQuestions);
  const correctAnswers = useSelector(selectCorrectAnswers);
  const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);
  const timeLeft = useSelector(selectTimeLeft);
  const testingStarted = useSelector(selectTestingStarted);
  const showResults = useSelector(selectShowResults);

  const dispatch = useDispatch();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (testingStarted) {
      const intervalId = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [testingStarted, timeLeft, dispatch]);

  useEffect(() => {
    if (timeLeft === 0) {
      dispatch(setShowResults(true));
    }
  }, [timeLeft]);

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].index) {
      dispatch(incrementCorrectAnswers());
    }

    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      setSelectedAnswer(null);
      dispatch(setTimeLeft(600));
    } else {
      dispatch(setShowResults(true));
    }
  };

  const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleStartTesting = () => {
    dispatch(setTestingStarted(true));
    dispatch(setTimeLeft(600));
  };

  const handleRestart = () => {
    dispatch(setTestingStarted(false));
    dispatch(setShowResults(false));
    dispatch(setCurrentQuestionIndex(0));
    setSelectedAnswer(null);
    setShowResults(false);
    dispatch(resetCorrectAnswers());
  };

  const MIN = 0;
  const MAX = questions.length;
  const normalize = (value: number) => ((value - MIN) * 100) / (MAX - MIN);
  const progress = normalize(currentQuestionIndex + 1);

  const question = questions[currentQuestionIndex];

  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{ marginTop: 2 }}>
        <Box component="div" sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {!showResults && "Тестирование React"}
          </Typography>
        </Box>
        {!testingStarted ? (
          <Box component="div" sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartTesting}
              sx={{ mt: 2 }}
            >
              Начать
            </Button>
          </Box>
        ) : (
          <>
            {!showResults && (
              <>
                <Typography variant="body1" component="p">
                  {`${Math.floor(timeLeft / 60)} : ${
                    timeLeft % 60 < 10 ? "0" : ""
                  }${timeLeft % 60}`}
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
                <FormControl component="fieldset" sx={{ mt: 4 }}>
                  <FormLabel component="legend" sx={{ color: "info.main" }}>
                    {question.question}
                  </FormLabel>
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={selectedAnswer}
                    onChange={handleSelectAnswer}
                    sx={{ mt: 2 }}
                  >
                    {question.answer.map((answer, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={<Radio />}
                        label={answer}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </>
        )}
      </Box>
      {testingStarted && (
        <Box sx={{ marginTop: 2 }}>
          {!showResults ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              Ответить
            </Button>
          ) : (
            <>
              <Results
                correct={correctAnswers}
                totalQuestions={questions.length}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleRestart}
                sx={{ mt: 2 }}
              >
                Начать сначала
              </Button>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Question;
