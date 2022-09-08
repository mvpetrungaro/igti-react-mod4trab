import styles from "../styles/Home.module.css";
import Image from "next/image";
import { Product } from "../models/product";
import PageContainer from "../components/PageContainer";
import styled from "styled-components";

export async function getStaticProps() {
  const products = await fetch(
    "http://fakestoreapi.com/products?limit=10"
  ).then((res) => res.json());

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}

const StyledContainerAnchor = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  width: 400px;
`;

const Home = ({ products }: { products: Product[] }) => {
  return (
    <PageContainer>
      <h1 className={styles.title}>Module 4: Practice</h1>

      <p className={styles.description}>Top 10 products</p>

      <div className={styles.grid}>
        {products.map((p) => {
          return (
            <StyledContainerAnchor
              key={p.id}
              href={`products/${p.id}`}
              className={styles.card}
            >
              <h4 style={{ textAlign: "center" }}>{p.title}</h4>
              <div
                style={{
                  flex: 1,
                  width: 250,
                  position: "relative",
                }}
              >
                <Image
                  src={p.image.replace("https", "http")}
                  alt={p.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <small style={{ margin: 10 }}>{p.category}</small>
            </StyledContainerAnchor>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Home;
