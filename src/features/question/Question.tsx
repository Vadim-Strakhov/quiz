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
} from "./questionSlice";
import Results from "../../components/Result";

const Question = () => {
  const questions = useSelector(selectQuestions);
  const correctAnswers = useSelector(selectCorrectAnswers);
  const dispatch = useDispatch();

  const [value, setValue] = useState<number>(
    () => Number(localStorage.getItem("currentQuestion")) || 0
  );
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [showResults, setShowResults] = useState<boolean>(
    () => localStorage.getItem("showResults") === "true"
  );

  const question = questions[value];

  useEffect(() => {
    const savedStartTime = localStorage.getItem("startTime");
    const currentTime = Date.now();
    if (savedStartTime) {
      const elapsedTime = Math.floor(
        (currentTime - Number(savedStartTime)) / 1000
      );
      setTimeLeft(() => Math.max(600 - elapsedTime, 0));
    } else {
      localStorage.setItem("startTime", String(currentTime));
    }
  }, [value]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      localStorage.setItem("timeLeft", String(timeLeft));
      return () => clearInterval(timerId);
    }
  }, [timeLeft, showResults]);

  useEffect(() => {
    localStorage.setItem("currentQuestion", String(value));
  }, [value]);

  useEffect(() => {
    localStorage.setItem("showResults", String(showResults));
  }, [showResults]);

  const handleNextQuestion = () => {
    if (selectedAnswer === question.index) {
      dispatch(incrementCorrectAnswers());
    }

    if (value < questions.length - 1) {
      setValue(value + 1);
      setSelectedAnswer(null);
      setTimeLeft(600); // Сброс таймера на 10 минут
      localStorage.setItem("startTime", String(Date.now())); // Сохранение времени начала нового вопроса
    } else {
      setShowResults(true);
      localStorage.setItem("showResults", "true");
      localStorage.removeItem("startTime");
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("timeLeft");
    }
  };

  const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleRestart = () => {
    setValue(0);
    setSelectedAnswer(null);
    setTimeLeft(600);
    setShowResults(false);
    dispatch(resetCorrectAnswers());
    localStorage.setItem("startTime", String(Date.now()));
    localStorage.setItem("currentQuestion", "0");
    localStorage.setItem("timeLeft", "600");
    localStorage.setItem("showResults", "false");
  };

  const MIN = 0;
  const MAX = questions.length;
  const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);
  const progress = normalise(value + 1);

  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{ marginTop: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {!showResults && "Тестирование"}
        </Typography>
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
      </Box>
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
    </Container>
  );
};

export default Question;
