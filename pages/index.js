import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  // Set states here
  const [countries, setCountries] = useState(null);

  // Define API url to fetch data from
  const url = "https://restcountries.eu/rest/v2/region/europe?fields=name";

  // Comment this chunk for Cache Storage API demo
  useEffect(() => {
    async function fetchNoCache() {
        try {
          // Fetch data from API
          const responseFromAPI = await fetch(url, {
            method: "GET",
          });
          // Resolve fetch to get data
          const dataFromAPI = await responseFromAPI.json();
          // Set list of countries for rendering
          setCountries(dataFromAPI);
        } catch (error) {
          console.log(error);
        }
    }
    fetchNoCache();
  }, []);

  // Uncomment this chunk for Cache Storage API demo
  // useEffect(() => {
  //   async function fetchWithCache() {
  //     // Since next js works on server side, need to check if cache is available in window
  //     if ("caches" in window) {
  //       // Open cache or create new one if not exists
  //       const cache = await caches.open("demo-cache-api");

  //       try {
  //         // Fetch data from API
  //         const responseFromAPI = await fetch(url, {
  //           method: "GET",
  //         });
  //         // Clone and resolve here so that cache.put can resolve the original response
  //         const dataFromAPI = await responseFromAPI.clone().json();

  //         // Set list of countries for rendering
  //         setCountries(dataFromAPI);

  //         // Here, cache resolves the fetch promise if status code of response is in 200 range
  //         // or rejects the promise if not in 200 range
  //         // Additionally, cache.put will also overwrite previous responses of the same request
  //         console.log("Create an entry in Cache Storage");
  //         cache.put(url, responseFromAPI);
  //       } catch (error) {
  //         // In case of fetch error, get data from cache
  //         console.log(error);
  //         console.log(
  //           "Fetch to API has failed so retrieve data from cache if any"
  //         );

  //         // Retrieve response from cache
  //         const responseFromCache = await cache.match(url);

  //         // If no match is found, it resolves to undefined
  //         // Due to async nature, even if fetch from API is successful, by the time we
  //         // reach here cache might not be populated yet so match would fail
  //         if (responseFromCache === undefined)
  //           console.log("Uh, no match is found in cache for " + url);
  //         else {
  //           console.log("Match is found in cache for " + url);
  //           const dataFromCache = await responseFromCache.json();

  //           // Set list of countries for rendering
  //           setCountries(dataFromCache);
  //         }
  //       }
  //     }
  //   }
  //   fetchWithCache();
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cache Storage API Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cache Storage API Demo</h1>
        <div className={styles.grid}>
          {countries !== null ? (
            countries.map((item, index) => {
              return (
                <div className={styles.card} key={index}>
                  <h3>{item.name}</h3>
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
