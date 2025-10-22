import type { Task } from "@/types/index";
import { AddNoteForm } from "./AddNoteForm";
import { NoteDetail } from "./NoteDetail";
type NotesPanelProps = {
  notes: Task["notes"];
};

export const NotesPanel = ({ notes }: NotesPanelProps) => {
  return (
    <>
      <AddNoteForm />
      <div className="divide-gray-100 mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 my-5">Notes:</p>
            {notes.map((note) => (
              <NoteDetail />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center pt-3">There is not note</p>
        )}
      </div>
    </>
  );
};
