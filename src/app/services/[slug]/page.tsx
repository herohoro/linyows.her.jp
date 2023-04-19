// import { NextPage } from "next";
import Image from "next/image";
// import React, { useState, useEffect } from "react";
import { FetchBlocks } from "notionate";
import {
  // Service,
  build,
  getPaths,
  getService,
  DBPage,
  // getServices,
} from "../../../lib/client";
import { Blocks } from "notionate/dist/components";

type ServiceProps = {
  params: { slug: string };
};

export const revalidate = 30;

export async function generateStaticParams() {
  const paths = await getPaths();
  return paths.map((slug) => slug);
}

const Service = async ({ params: { slug } }) => {
  const service = await getService(slug);
  const post = await build(service as unknown as DBPage);
  const blocks = await FetchBlocks(post.id);

  return (
    <>
      <p>テスト_slug確認</p>
      <header className="service-header">
        <div>
          <h2 className="name">{post?.title}</h2>
          <p className="meta">
            作成日： <span>{post?.date}</span>, タグ：{" "}
            {post?.tags.map((tag, i) => (
              <span key={`${i}`}>{tag}</span>
            ))}
          </p>
        </div>
        {post?.cover && (
          <Image
            className="cover"
            src={post.cover}
            width={500}
            height={250}
            alt="Cover image"
          />
        )}
      </header>
      <Blocks blocks={blocks!} />
    </>
  );
};

export default Service;
