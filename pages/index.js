import Head from "next/head";
import { Layout } from "../components/Layout";
// import {getStaticProps} from '../Server';

import { DATABASE_ID, TOKEN } from "../config/index";

export default function Home({ todoNames }) {
  console.log(todoNames);
  return (
    <div>
      <Head>
        <title>YHW</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>{todoNames[0]}</h1>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ page_size: 100 }),
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options
  ).then((response) => response.json());

  console.log(res);
  const todoNames = res.results.map(
    (todo) => todo.properties.todo.title[0].plain_text
  );

  console.log(`todos name: ${todoNames}`);
  return { props: { todoNames } };
}
