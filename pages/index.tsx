import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export interface Product {
  id: number
  title?: string
  category?: string
  image?: string
  price?: number
}

export async function getStaticProps() {
  const products = await fetch(
    'https://fakestoreapi.com/products?limit=10'
  ).then((res) => res.json())

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}

const Home = ({ products }: { products: Product[] }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>IGTI - React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Module 4: Practice</h1>

        <p className={styles.description}>Top 10 products</p>

        <div className={styles.grid}>
          {products.map((p) => {
            return (
              <a
                key={p.id}
                href={`products/${p.id}`}
                className={styles.card}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 400,
                  width: 400,
                }}
              >
                <h4 style={{ textAlign: 'center' }}>{p.title}</h4>
                <div
                  style={{
                    flex: 1,
                    width: 250,
                    position: 'relative',
                  }}
                >
                  <Image
                    src={p.image!}
                    alt={p.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <small style={{ margin: 10 }}>{p.category}</small>
              </a>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        IGTI - React - Module 4: Practice
      </footer>
    </div>
  )
}

export default Home
