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
  correctAnswers: Number(localStorage.getItem("correctAnswers")) || 0,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    incrementCorrectAnswers(state) {
      state.correctAnswers += 1;
      localStorage.setItem("correctAnswers", String(state.correctAnswers));
    },
    setCorrectAnswers(state, action: PayloadAction<number>) {
      state.correctAnswers = action.payload;
      localStorage.setItem("correctAnswers", String(state.correctAnswers));
    },
    resetCorrectAnswers(state) {
      state.correctAnswers = 0;
      localStorage.setItem("correctAnswers", "0");
    },
  },
});

export const {
  incrementCorrectAnswers,
  setCorrectAnswers,
  resetCorrectAnswers,
} = questionSlice.actions;

export const selectQuestions = (state: RootState) => state.question.questions;
export const selectCorrectAnswers = (state: RootState) =>
  state.question.correctAnswers;

export default questionSlice.reducer;
