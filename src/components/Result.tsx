import { Box, Typography } from "@mui/material";

interface ResultsProps {
  correct: number;
  totalQuestions: number;
}

const Results: React.FC<ResultsProps> = ({ correct, totalQuestions }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Результаты теста
    </Typography>
    <Typography variant="body1" gutterBottom>
      Вы ответили правильно на {correct} из {totalQuestions} вопросов.
    </Typography>
  </Box>
);

export default Results;
