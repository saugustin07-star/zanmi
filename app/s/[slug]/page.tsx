import { getSurveyBySlug } from '@/lib/db';
import StudentSurveyFlow from '@/components/survey/StudentSurveyFlow';
import Link from 'next/link';
import Image from 'next/image';

export default async function StudentSurveyPage({
  params,
}: {
  params: { slug: string };
}) {
  const survey = await getSurveyBySlug(params.slug);

  if (!survey) {
    return (
      <div className="min-h-screen bg-zbg flex flex-col">
        <div className="bg-zdark px-4 py-3">
          <Image src="/zanmi-icon.png" alt="Zanmi" width={28} height={28} className="brightness-0 invert" />
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-2xl font-black text-zdark mb-3">Survey not found</h1>
            <p className="text-zdark/60 font-semibold leading-relaxed">
              This survey link may be expired or incorrect. Ask your teacher or program leader for the right link.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block text-sm font-bold text-zpurple hover:underline"
            >
              ← Back to Zanmi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <StudentSurveyFlow survey={survey} />;
}
