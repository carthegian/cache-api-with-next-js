import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchFromMovieDB() {
      const url = "https://api.themoviedb.org/4/list/1";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_TOKEN,
        },
      });
      const data = await response.json();
      setMovies(data.results);
      //console.log(data.results);
    }
    fetchFromMovieDB();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cache Storage API Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cache Storage API Demo</h1>
        <div className={styles.grid}>
          {movies !== null ? (
            movies.map((item, index) => {
              return (
                <div className={styles.card} key={index}>
                  {item.original_title}
                </div>
              );
            })
          ) : (
            <div>Loading data...</div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
