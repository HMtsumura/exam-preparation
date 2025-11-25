import Link from "next/link";

// app/books/[id]/page.tsx
type Book = {
  id: number;
  bookName: string;
};

type Chapter = {
  id: number;
  chapterTitle: string;
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

      <h2>章</h2>
      <ul>
        {chapters.map((chapter) => (
          <li> 
            <Link href={`/chapters/${chapter.id}`}>{chapter.chapterTitle}</Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
