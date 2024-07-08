import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Question {
  id: number;
  question: string;
  answer: string[];
  index: number;
}

interface QuestionState {
  questions: Question[];
  correctAnswers: number;
  correctQuestionIndex: number;
  timeLeft: number;
  showResults: boolean;
  testingStarted: boolean;
}

const initialState: QuestionState = {
  questions: [
    {
      id: 1,
      question: "Что такое React?",
      answer: [
        "Язык программирования",
        "Библиотека для создания пользовательских интерфейсов",
        "Среда выполнения JavaScript",
      ],
      index: 1,
    },
    {
      id: 2,
      question:
        "Какой основной хук используется для работы с состоянием в React?",
      answer: ["useState", "useCallback", "useMemo"],
      index: 0,
    },
    {
      id: 3,
      question: "Что такое JSX?",
      answer: [
        "Расширение синтаксиса JavaScript",
        "Стандарт ES6",
        "Фреймворк для создания веб-приложений",
      ],
      index: 0,
    },
    {
      id: 4,
      question:
        "Какой хук используется для работы с жизненным циклом в функциональных компонентах React?",
      answer: ["useState", "useEffect", "useContext"],
      index: 1,
    },
    {
      id: 5,
      question: "Что такое props в React?",
      answer: [
        "Свойства компонентов",
        "Методы компонентов",
        "События компонентов",
      ],
      index: 0,
    },
    {
      id: 6,
      question: "Для чего используется useEffect в React?",
      answer: [
        "Управление жизненным циклом",
        "Создание новых компонентов",
        "Определение состояния",
      ],
      index: 0,
    },
    {
      id: 7,
      question: "Что такое Virtual DOM?",
      answer: [
        "Легковесное представление реального DOM",
        "Среда выполнения JavaScript",
        "Способ стилизации компонентов",
      ],
      index: 0,
    },
    {
      id: 8,
      question:
        "Какой из этих методов жизненного цикла вызывается после первого рендеринга классового компонента?",
      answer: [
        "componentDidMount",
        "componentWillUnmount",
        "shouldComponentUpdate",
      ],
      index: 0,
    },
    {
      id: 9,
      question:
        "Какой атрибут используется для определения уникальных ключей в списках React?",
      answer: ["key", "id", "name"],
      index: 0,
    },
    {
      id: 10,
      question: "Что такое HOC в React?",
      answer: [
        "Higher-Order Component",
        "High-Order Container",
        "Helper Object Component",
      ],
      index: 0,
    },
  ],
  correctAnswers: 0,
  correctQuestionIndex: 0,
  timeLeft: 600,
  testingStarted: false,
  showResults: false,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    incrementCorrectAnswers(state) {
      state.correctAnswers += 1;
    },
    setCorrectAnswers(state, action: PayloadAction<number>) {
      state.correctAnswers = action.payload;
    },
    resetCorrectAnswers(state) {
      state.correctAnswers = 0;
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.correctQuestionIndex = action.payload;
    },
    setTimeLeft(state, action: PayloadAction<number>) {
      state.timeLeft = action.payload;
    },
    setShowResults(state, action: PayloadAction<boolean>) {
      state.showResults = action.payload;
    },
    setTestingStarted(state, action: PayloadAction<boolean>) {
      state.testingStarted = action.payload;
    },
  },
});

export const {
  incrementCorrectAnswers,
  setCorrectAnswers,
  resetCorrectAnswers,
  setCurrentQuestionIndex,
  setTimeLeft,
  setTestingStarted,
  setShowResults,
} = questionSlice.actions;

export const selectQuestions = (state: RootState) => state.question.questions;
export const selectCorrectAnswers = (state: RootState) =>
  state.question.correctAnswers;
export const selectCurrentQuestionIndex = (state: RootState) =>
  state.question.correctQuestionIndex;
export const selectTimeLeft = (state: RootState) => state.question.timeLeft;
export const selectTestingStarted = (state: RootState) =>
  state.question.testingStarted;
export const selectShowResults = (state: RootState) =>
  state.question.showResults;

export default questionSlice.reducer;
