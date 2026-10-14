// The "Which package fits you?" quiz: questions, answers and how the result is chosen.
// Everything about the quiz lives here, so changing a question or a rule only
// ever touches this file.

import { packages } from './packages';
import type { PackageInfo } from './packages';

export type QuestionId = 'who' | 'stage' | 'help' | 'when';

export interface QuizAnswer {
  id: string;
  label: string;
  // The value this answer fills in on the contact form. Left out when the
  // contact form has no matching option.
  contact?: string;
}

export interface QuizQuestion {
  id: QuestionId;
  title: string;
  answers: QuizAnswer[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'who',
    title: "Who's moving?",
    answers: [
      { id: 'solo', label: 'Just me', contact: 'Just me' },
      { id: 'couple', label: 'Me and a partner', contact: 'Me and a partner' },
      { id: 'family', label: 'A family with kids', contact: 'A family with children' },
    ],
  },
  {
    id: 'stage',
    title: 'Where are you in the process?',
    answers: [
      { id: 'deciding', label: 'Still deciding if Uruguay is right', contact: 'Still researching' },
      {
        id: 'decided',
        label: "I've decided but haven't started",
        contact: 'Decided, but not started yet',
      },
      { id: 'documents', label: "I've started on documents", contact: 'Gathering documents' },
      { id: 'here', label: "I'm already in Uruguay", contact: 'Already in Uruguay' },
    ],
  },
  {
    id: 'help',
    title: 'How much do you want us to handle?',
    answers: [
      { id: 'guide', label: 'Guide me and come to my appointments' },
      {
        id: 'full',
        label: 'Also set up my SIM, health insurance, bank and rental search',
      },
    ],
  },
  {
    id: 'when',
    title: 'When are you moving?',
    answers: [
      { id: 'soon', label: 'Within 3 months', contact: 'Within 3 months' },
      { id: 'mid', label: '3 to 6 months', contact: '3 to 6 months' },
      { id: 'later', label: 'More than 6 months' },
      { id: 'unsure', label: 'Not sure yet', contact: 'Not sure yet' },
    ],
  },
];

export type Answers = Partial<Record<QuestionId, string>>;

export interface QuizResult {
  kind: 'package' | 'scouting';
  // Set when kind is 'package'.
  pkg?: PackageInfo;
  // The value for the contact form's "package" dropdown.
  contactPackage: string;
  // Short extra lines shown under the result.
  notes: string[];
}

// Questions that apply for these answers. If someone is still deciding, how much
// they want handled doesn't matter yet, because the result is a scouting trip.
// Someone already in Uruguay isn't asked when they are moving.
export function visibleQuestions(answers: Answers): QuizQuestion[] {
  return quizQuestions.filter(
    (q) =>
      !(q.id === 'help' && answers.stage === 'deciding') &&
      !(q.id === 'when' && answers.stage === 'here'),
  );
}

export function getResult(answers: Answers): QuizResult {
  const notes: string[] = [];

  if (answers.when === 'soon' && answers.stage !== 'here') {
    notes.push(
      'Good appointment slots fill up months ahead, so with a move this soon it is worth getting in touch now.',
    );
  }

  if (answers.stage === 'deciding') {
    return { kind: 'scouting', contactPackage: 'other', notes };
  }

  const wantsFull = answers.help === 'full';
  const isFamily = answers.who === 'family';

  let id: PackageInfo['id'] = wantsFull ? 'full' : 'essential';
  if (wantsFull && isFamily) id = 'family';

  if (isFamily && !wantsFull) {
    notes.push(
      'Tell us about your family on the call, and we will point you to the right school and childcare options for your plan.',
    );
  }

  const pkg = packages.find((p) => p.id === id)!;
  return { kind: 'package', pkg, contactPackage: id, notes };
}

// The contact page address for a finished quiz, with the answers filled in.
export function contactLink(answers: Answers, result: QuizResult): string {
  const params = new URLSearchParams();
  params.set('package', result.contactPackage);

  const pick = (qid: QuestionId) =>
    quizQuestions.find((q) => q.id === qid)?.answers.find((a) => a.id === answers[qid])?.contact;

  const travelers = pick('who');
  if (travelers) params.set('travelers', travelers);

  const stage = pick('stage');
  if (stage) params.set('stage', stage);

  // Someone already in Uruguay isn't "moving" any more.
  const timeline = answers.stage === 'here' ? 'I am already in Uruguay' : pick('when');
  if (timeline) params.set('timeline', timeline);

  return `/contact?${params.toString()}`;
}
