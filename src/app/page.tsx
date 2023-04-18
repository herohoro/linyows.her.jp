import { GetStaticProps, NextPage } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import { QueryDatabaseResponseEx, Link as NLink } from "notionate";
import { Gallery, List, Table } from "notionate/dist/components";
import { getServices } from "../lib/client";

type Props = {
  services: QueryDatabaseResponseEx;
};

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const services = await getServices();
//   return {
//     props: {
//       services,
//     },
//   };
// };

const Home = async () => {
  const services = await getServices();
  return (
    <>
      <h2>テーブルview</h2>
      <Table
        keys={["タイトル", "公開日時", "タグ"]}
        db={services}
        href="/services/[Slug]"
        link={Link as NLink}
      />
      <h2>ギャラリーview</h2>
      <Gallery
        keys={["タイトル", "公開日時", "タグ"]}
        db={services}
        preview="cover"
        size="small"
        fit={true}
        href="/services/[Slug]"
        link={Link as NLink}
      />
      <h2>リストview</h2>
      <List
        keys={["タイトル", "公開日時", "タグ"]}
        db={services}
        href="/services/[Slug]"
        link={Link as NLink}
      />
    </>
  );
};

export default Home;
