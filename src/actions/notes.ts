"use server";

import { handleError } from "@/lib/utils";
import { getUser } from "./auth";
import { prisma } from "@/lib/prisma";

export async function createNotesAction() {
  try {
    const user = await getUser();

    if (!user) throw new Error("You must be logged in to create a note");

    const note = await prisma.notes.create({
      data: {
        text: "",
        title: "",
        authorId: user.id,
      },
    });

    return { errorMessage: null, noteId: note.id };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateNotesAction(noteId: string, text: string) {
  try {
    const user = await getUser();

    if (!user) throw new Error("You must be logged in to update a note");

    await prisma.notes.update({
      where: {
        id: noteId,
        authorId: user?.id,
      },
      data: {
        text: text,
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateNotesTitleAction(noteId: string, title: string) {
  try {
    const user = await getUser();

    if (!user) throw new Error("You must be logged in to update a note title");

    await prisma.notes.update({
      where: {
        id: noteId,
        authorId: user?.id,
      },
      data: {
        title: title,
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteNotesAction(noteId: string) {
  try {
    const user = await getUser();

    if (!user) throw new Error("You must be logged in to delete a note");

    await prisma.notes.delete({
      where: {
        id: noteId,
        authorId: user?.id,
      }
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
