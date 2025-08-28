"use server";

import { handleError } from "@/lib/utils";
import { getUser } from "./auth";
import { prisma } from "@/lib/prisma";
import { callGemini } from "@/gemini";

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
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export async function askAIAboutNotesAction(
  newQuestions: string[],
  responses: string[],
) {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to ask AI questions");

    const notes = await prisma.notes.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        title: true,
        text: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (notes.length === 0) {
      return "You don't have any notes yet.";
    }

    const formattedNotes = notes
      .map((note) =>
        `Title: ${note.title}
      Text: ${note.text}
      Created at: ${note.createdAt}
      Last updated: ${note.updatedAt}
      `.trim(),
      )
      .join("\n");

    const messages = [
      {
        role: "user",
        content: `
          You are a helpful assistant that answers questions about a user's notes. 
          Assume all questions are related to the user's notes. 
          Make sure that your answers are not too verbose and you speak succinctly. 
          Your responses MUST be formatted in clean, valid HTML with proper structure. 
          Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
          Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
          Avoid inline styles, JavaScript, or custom attributes and remove any empty items and all cli commands should be inside double quotes.
          
          Rendered like this in JSX:
          <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
    
          Here are the user's notes:
          ${formattedNotes}
          `,
      },
    ];

    for (let i = 0; i < newQuestions.length; i++) {
      messages.push({ role: "user", content: newQuestions[i] });
      if (responses.length > i) {
        messages.push({ role: "model", content: responses[i] });
      }
    }

    const contents = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const response = callGemini(contents);

    return response;
  } catch (error) {
    return handleError(error);
  }
}
