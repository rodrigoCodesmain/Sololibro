"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Usamos useSearchParams para obtener parámetros de búsqueda
import styles from '../styles/Libros.module.css';

interface Book {
  _id: string;
  titulo: string;  // Cambiado a 'titulo' en minúsculas
  autor: string;   // Cambiado a 'autor' en minúsculas
  categorias: string;  // Cambiado a 'categorias' en minúsculas
  isbn: string;    // Cambiado a 'isbn' en minúsculas
  precio: number;
  ImagenURL: string;  // Cambiado a 'ImagenURL' en minúsculas
}

export default function Libros() {
  // Almacena la lista de libros obtenidos
  const [books, setBooks] = useState<Book[]>([]);

  // Almacena el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  const searchParams = useSearchParams();

  // Obtener el parámetro searchTerm de la URL
  useEffect(() => {
    const urlSearchTerm = searchParams.get('searchTerm') || '';
    setSearchTerm(urlSearchTerm); // Establecemos el término de búsqueda al cargar el componente
    fetchBooks(); // Cargamos los libros al montar el componente
  }, [searchParams]); // Se ejecuta cada vez que cambian los parámetros de búsqueda en la URL

  // Función para obtener los libros
  const fetchBooks = async () => {
    try {
      const url = 'https://localhost:3001/api/libros'; // URL de la API
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

  return (
    <div className={styles.bookContainer} id="bookContainer">
      {/* Filtramos los libros según el término de búsqueda */}
      {books
        .filter(book =>
          (book.titulo && book.titulo.toLowerCase().includes(searchTerm.toLowerCase())) ||  // 'titulo' en minúsculas
          (book.autor && book.autor.toLowerCase().includes(searchTerm.toLowerCase())) ||        // 'autor' en minúsculas
          (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase()))             // 'isbn' en minúsculas
        )
        .map((book) => (
          <div key={book._id} className={styles.book}>
            <div className={styles.bookImage}>
              <img src={book.ImagenURL} alt={book.titulo} />  {/* 'titulo' en minúsculas */}
            </div>
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.titulo}</h3>  {/* 'titulo' en minúsculas */}
              <p>{book.autor}</p>  {/* 'autor' en minúsculas */}
              <p><strong>Categoría:</strong> {book.categorias}</p>  {/* 'categorias' en minúsculas */}
              <p><strong>ISBN:</strong> {book.isbn}</p>  {/* 'isbn' en minúsculas */}
              <div className={styles.price}>${book.precio}</div>
              <button>Agregar</button>
            </div>
          </div>
        ))}
    </div>
  );
}