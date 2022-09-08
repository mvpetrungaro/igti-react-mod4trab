import Image from "next/image";
import { Product } from "../../models/product";
import { useFetch } from "../../hooks/useFetch";
import PageContainer from "../../components/PageContainer";

export async function getStaticPaths() {
  const products = (await fetch(
    "http://fakestoreapi.com/products?limit=10"
  ).then((res) => res.json())) as Product[];

  return {
    paths: products.map((p) => ({
      params: { id: p.id.toString() },
    })),
    fallback: true,
  };
}

type PathParams = { params: { id: string } };

export async function getStaticProps({ params }: PathParams) {
  const product = await fetch(
    `http://fakestoreapi.com/products/${params.id}`
  ).then((res) => res.json());

  return {
    props: {
      product,
    },
  };
}

type ProductPageProps = { product: Product };

const ProductPage = ({ product }: ProductPageProps) => {
  //Default value in case of fallback
  if (!product) {
    product = { id: 0, title: "", category: "", image: "" };
  }

  const { data, error } = useFetch<Product>(`products/${product.id}`);

  if (!product.id) {
    return <div>Loading ...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error getting updated product price, please try again.</div>;
  }

  return (
    <PageContainer
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{product.title}</h1>

      <div
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
          margin: 20,
        }}
      >
        <Image
          src={product.image.replace("https", "http")}
          alt={product.title}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <big style={{ margin: 10 }}>R$ {data?.price?.toFixed(2)}</big>
    </PageContainer>
  );
};

export default ProductPage;
