"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from './sideBarGenrer';
import styles from '../styles/Libros.module.css';

interface Book {
  _id: string;
  titulo: string;
  autor: string;
  categorias: string;
  isbn: string;
  precio: number;
  ImagenURL: string;
  sucursal: string;
}

export default function Libros() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const booksPerPage = 9; // Número de libros por página
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlSearchTerm = searchParams.get('searchTerm') || '';
    setSearchTerm(urlSearchTerm);
    fetchBooks();
  }, [searchParams]);

  const fetchBooks = async () => {
    try {
      const url = 'https://localhost:3001/api/libros';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los libros');
      }
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  // Filtramos los libros basados en búsqueda y género
  const filteredBooks = books.filter(book => {
    const matchesSearchTerm = 
      (book.titulo && book.titulo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.autor && book.autor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGenre = 
      selectedGenre === null || 
      (book.categorias && book.categorias.toLowerCase().includes(selectedGenre.toLowerCase()));

    return matchesSearchTerm && matchesGenre;
  });

  // Determinamos el índice de inicio y fin de los libros a mostrar según la página actual
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Calculamos el número total de páginas
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div>
      <Sidebar onGenreSelect={setSelectedGenre} />
      
      <div className={styles.bookContainer} id="bookContainer">
        {currentBooks.map((book) => (
          <div key={book._id} className={styles.book}>
            <div className={styles.bookImage}>
              <img src={book.ImagenURL} alt={book.titulo} />
            </div>
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.titulo}</h3>
              <p>{book.autor}</p>
              <p><strong>Categoría:</strong> {book.categorias}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Sucursal:</strong> {book.sucursal}</p>
              <div className={styles.price}>${book.precio}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Barra de numeración */}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}