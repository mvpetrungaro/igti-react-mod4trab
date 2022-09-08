import React from 'react'
import styles from '../../styles/Home.module.css'
import StyledInput from '../StyledInput'

interface Product {
  id: number
  title: string
  category: string
  image: string
}

interface HomeContentProps {
  products: Product[]
}

export async function getStaticProps() {
  const products = await fetch(
    'https://fakestoreapi.com/products?limit=10'
  ).then((res) => res.json())

  return {
    props: {
      products,
    },
  }
}

export default function HomeContent({ products }: HomeContentProps) {
  return (
    <>
      <h1 className={styles.title}>Module 4: Practice</h1>

      <p className={styles.description}>Top 10 products</p>

      <StyledInput />

      <div className={styles.grid}>
        {products.map((p) => {
          return (
            <a
              key={p.id}
              href="https://nextjs.org/docs"
              className={styles.card}
            >
              <h2>{p.title}</h2>
              <p>{p.category}</p>
            </a>
          )
        })}
      </div>
    </>
  )
}
