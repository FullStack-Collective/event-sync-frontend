import { sessionService } from "@/modules/sessions/services/session.service";
import { SessionHeader } from "@/modules/sessions/components/SessionHeader";
import { SessionTitle } from "@/modules/sessions/components/SessionTitle";
import { QuestionList } from "@/modules/questions/components/QuestionList";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
    sessionId: string;
  };
}

export default async function SessionPage({ params }: PageProps) {
  const { sessionId } = params;

  let session;

  try {
    //  FIX: enlever eventId
    session = await sessionService.getOne(sessionId);
  } catch (e) {
    console.error("Session error:", e);
    notFound();
  }

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        
        <div className="flex flex-col gap-3">
          <SessionHeader session={session} />
          <SessionTitle title={session.title} />
        </div>

        <QuestionList sessionId={sessionId} pollIntervalMs={5000} />
      </div>
    </section>
  );
}