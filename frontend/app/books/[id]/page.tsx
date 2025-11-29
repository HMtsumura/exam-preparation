import ChapterList from "./ChapterList";

// app/books/[id]/page.tsx
type Book = {
  id: number;
  bookName: string;
};

type Chapter = {
  id: number;
  chapterTitle: string;
  progressPercent: number
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  
  const bookRes = await fetch(`http://localhost:3000/api/books/${id}`);
  const book: Book = await bookRes.json();

  const chaptersRes = await fetch(`http://localhost:3000/api/books/${id}/chapters`);
  const chapters: Chapter[] = await chaptersRes.json();

  return (
    <div>
        <h1>参考書詳細</h1>
        <p>ID: {book.id}</p>
        <p>試験名: {book.bookName}</p>

         <ChapterList initialChapters={chapters} bookId={book.id}/>
    </div>
  );
}
