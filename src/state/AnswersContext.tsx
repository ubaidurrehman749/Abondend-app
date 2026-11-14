import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";

export type Answer = {
  choice: string;
  evidence: string;
  theme: string;
};

type State = { answers: Record<string, Answer> };

type Action =
  | { type: "ANSWER_QUESTION"; objectId: string; answer: Answer }
  | { type: "RESET" };

const STORAGE_KEY = "abnf-answers";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER_QUESTION":
      return {
        answers: { ...state.answers, [action.objectId]: action.answer },
      };
    case "RESET":
      return { answers: {} };
    default:
      return state;
  }
}

function loadInitial(): State {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    // ignore, start empty
  }
  return { answers: {} };
}

type ContextValue = {
  answers: Record<string, Answer>;
  answerQuestion: (objectId: string, answer: Answer) => void;
  reset: () => void;
};

const AnswersContext = createContext<ContextValue | null>(null);

export function AnswersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const value: ContextValue = {
    answers: state.answers,
    answerQuestion: (objectId, answer) =>
      dispatch({ type: "ANSWER_QUESTION", objectId, answer }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return (
    <AnswersContext.Provider value={value}>{children}</AnswersContext.Provider>
  );
}

export function useAnswers(): ContextValue {
  const ctx = useContext(AnswersContext);
  if (!ctx) throw new Error("useAnswers must be used inside AnswersProvider");
  return ctx;
}
