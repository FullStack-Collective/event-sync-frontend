import { Question } from "../types/question.types";
import { UpvoteButton } from "./UpvoteButton";

interface Props {
  question: Question;
  onUpvoteUpdate: (id: string, newCount: number) => void;
}

export function QuestionItem({ question, onUpvoteUpdate }: Props) {
  return (
    <li className="flex items-start gap-3 p-3 rounded-lg border border-[var(--color-border-light)] bg-[var(--color-bg)]/40 hover:border-[var(--color-border)] transition">
      <UpvoteButton
        questionId={question.id}
        initialCount={question.upvotes}
        onUpdate={onUpvoteUpdate}
      />
      <p className="flex-1 text-sm text-[var(--color-text)] leading-relaxed pt-1">
        {question.content}
      </p>
    </li>
  );
}
