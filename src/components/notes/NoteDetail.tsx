import { useAuth } from "@/hooks/useAuth";
import type { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMemo } from "react";

type NoteDetailProps = {
  note: Note;
};

export const NoteDetail = ({ note }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data, note]);

  if (isLoading) return "Loading...";
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} by: <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      {canDelete && (
        <button className="bg-red-600 hover:bg-red-900 p-2 text-xs text-white font-bold cursor-pointer transition-colors">
          Delete
        </button>
      )}
    </div>
  );
};
