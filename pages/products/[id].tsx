import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { Product } from '..'
import { useFetch } from '../../hooks/useFetch'

export async function getStaticPaths() {
  const products = (await fetch(
    'https://fakestoreapi.com/products?limit=10'
  ).then((res) => res.json())) as Product[]

  return {
    paths: products.map((p) => ({
      params: { id: p.id.toString() },
    })),
    fallback: true,
  }
}

type PathParams = { params: { id: string } }

export async function getStaticProps({ params }: PathParams) {
  const product = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  ).then((res) => res.json())

  return {
    props: {
      product,
    },
  }
}

type ProductPageProps = { product: Product }

const ProductPage = (
  { product }: ProductPageProps = { product: { id: 0 } }
) => {
  const { data, error } = useFetch<Product>(`products/${product?.id}`)

  if (!product) {
    return <div>Loading ...</div>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>IGTI - React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={styles.main}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 className={styles.title}>{product.title}</h1>

        <div
          style={{
            flex: 1,
            width: '100%',
            position: 'relative',
            margin: 20,
          }}
        >
          <Image
            src={product.image!}
            alt={product.title}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <big style={{ margin: 10 }}>R$ {data?.price?.toFixed(2)}</big>
      </main>

      <footer className={styles.footer}>
        IGTI - React - Module 4: Practice
      </footer>
    </div>
  )
}

export default ProductPage
