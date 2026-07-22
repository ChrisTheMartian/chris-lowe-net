// articles.js - Foundational Content Pillars for chris-lowe.net
// Structured data pipeline for Chris to review, iterate, and publish.

const ARTICLES_DATA = [
  {
    id: "building-commonplace",
    pillar: "AI & Knowledge Systems",
    title: "I Gave My AI a Memory. It Started Running My Life.",
    subtitle: "The real story of why I built Commonplace, and what it caught before it cost me a job interview.",
    date: "July 2026",
    dateISO: "2026-07-22",
    readTime: "3 min read",
    summary: "Why I built a personal AI operating system called Commonplace, after a decade of note-taking systems, and AI memory itself, failing me the same way.",
    content: `
      <p>I've had some of the best conversations of my life with an AI. Deep ones, working through a decision, sharpening an idea, actually thinking out loud with something that thought back.</p>
      <p>Then I'd close the tab. And it was gone.</p>
      <p>Not paraphrased, gone. Even with memory turned on, whatever we'd built in one conversation didn't carry into the next. I'd assumed AI memory worked something like a person's. It doesn't. It forgets the parts that mattered most.</p>
      <p>I'd been down this road before. Around 2021 I built my first Obsidian vault, a personal knowledge base, a "second brain." I loved it. Then it got bloated, too much to manage myself, no clear place for anything, until it collapsed under its own weight and I walked away. Back to pen and paper for a while. Then Notion, which turned out to be limiting in a different way.</p>
      <p>By the time I came back to Obsidian, I had a reason to think it'd stick this time: I could use AI to build it out, fast, in ways I couldn't do alone.</p>
      <p>So I started small. Every time the AI forgot something important from a conversation, I logged it myself, just so it wouldn't be lost again. A repository. A giant notebook.</p>
      <p>That notebook didn't stay small. Over time it grew into a CRM, a diary, a project management system, and a living reference library, everything sorted by the part of my life it belonged to. Without quite meaning to, I'd built an operating system. I just called it Commonplace.</p>
      <p>The notebook worked, but there was a limit to it. I was still the one holding all the rules in my head, where things went, how to file them, what mattered enough to keep. Every new AI conversation, I was re-explaining that too.</p>
      <p>So I wrote the rules down. Not notes to myself, instructions the AI could actually read and follow. One document that says, in plain terms: here's what this vault is for, here's what belongs where, here's how to handle the situations that come up. It's the operating manual, and it's the first thing any AI reads before it does anything else.</p>
      <p>That one change did more than any feature I'd added before it. The AI stopped being something I fed information to and started operating the system with me, creating notes, filing them correctly, running weekly reviews, catching the thing I'd forgotten to follow up on. Two different AI models read the same rules and follow them the same way. Either one can pick up exactly where the other left off.</p>
      <p>A few weeks ago I had an interview lined up with a consulting firm. The recruiter emailed three time options, all Central, 9, 10, or 1. I replied and picked 10.</p>
      <p>The calendar invite that came back said 11.</p>
      <p>Easy mistake to make on either end. But if it had gone unnoticed, I'd have shown up an hour off for a call that decided whether I got the job.</p>
      <p>I didn't catch it by being careful. Part of my routine now is a session where the AI sweeps my email, calendar, and task list together and tells me what doesn't line up. That's where this surfaced, the email I'd sent and the invite I'd gotten back told two different stories, and checking them against each other is what caught it.</p>
      <p>That's the actual point of Commonplace. Not to hold pretty notes. To hold the facts of my life accurately enough that nothing falls through the gap between one channel and the next.</p>
      <p>None of this happened because I have some special talent for building software. I don't write code for a living. What I've spent ten years doing, in film production, in enterprise learning and development, now in AI operations, is the same thing every time: take something complicated, and build the part that lets people who aren't experts in it actually use it.</p>
      <p>Commonplace is a small, personal version of that same instinct. Nobody assigned it. Nobody's paying for it. I built it because living with a system that quietly failed me wasn't something I could leave alone.</p>
      <p>That's really what this is proof of. Not that I can set up an Obsidian vault. That when something doesn't work, I don't wait for someone else to fix it. I build the fix, watch where it breaks, and build it again.</p>
      <p>That's not a line I can put on a resume. But it's the only skill that actually matters when the playbook doesn't exist yet, which, in most of the rooms I want to work in, it doesn't.</p>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ARTICLES_DATA;
}
