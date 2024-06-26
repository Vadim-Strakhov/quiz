import { createSlice } from "@reduxjs/toolkit";
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
      index: 1,
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
      index: 0,
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
        "Управление побочными эффектами",
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
    {
      id: 11,
      question: "Для чего используется Context API в React?",
      answer: [
        "Для управления глобальным состоянием",
        "Для создания новых компонентов",
        "Для оптимизации рендеринга",
      ],
      index: 0,
    },
    {
      id: 12,
      question: "Какой хук используется для создания контекста в React?",
      answer: ["createContext", "useContext", "useReducer"],
      index: 0,
    },
    {
      id: 13,
      question: "Что такое Redux?",
      answer: [
        "Контейнер для управления состоянием",
        "Фреймворк для создания API",
        "Библиотека для работы с формами",
      ],
      index: 0,
    },
    {
      id: 14,
      question: "Что такое 'props drilling'?",
      answer: [
        "Передача пропсов через множество уровней вложенности",
        "Метод оптимизации производительности",
        "Техника стилизации компонентов",
      ],
      index: 0,
    },
    {
      id: 15,
      question: "Какой хук используется для редюсеров в React?",
      answer: ["useReducer", "useState", "useEffect"],
      index: 0,
    },
  ],
  correctAnswers: 0,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    incrementCorrectAnswers(state) {
      state.correctAnswers += 1;
    },
  },
});

export const { incrementCorrectAnswers } = questionSlice.actions;

export const selectQuestions = (state: RootState) => state.question.questions;
export const selectCorrectAnswers = (state: RootState) =>
  state.question.correctAnswers;

export default questionSlice.reducer;
