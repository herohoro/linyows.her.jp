import { NextPage } from "next";

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

// type Props = {
// service?: Service;
// blocks?: ListBlockChildrenResponseEx;
// };
type Params = {
  // slug: string;
  params: Slug;
};
type Slug = {
  slug: string;
};

export async function generateStaticParams() {
  const paths = await getPaths();
  return paths.map((slug) => slug);
}

const Service: NextPage<Params> = async ({ params: { slug } }) => {
  // console.log(JSON.stringify(slug, null, 2));
  // console.log(slug.params.slug);
  // console.log("*************");
  // slug======{"params": {"slug": "text"},"searchParams": {}}
  // slugを入れて、pageIdを引っ掛ける

  const service = await getService(slug);

  // console.log(JSON.stringify(service, null, 2));
  // service=========={"object": "page","id": "13267987-df78-41b2-9096-82b9684b3892","created_time": "2023-04-18T08:37:00.000Z",

  const post = await build(service as unknown as DBPage);

  // console.log(service.id);
  // console.log("*****************");
  const blocks = await FetchBlocks(post.id);
  // console.log(JSON.stringify(blocks, null, 2));
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
        <img className="cover" src={post?.cover} width="250px" />
      </header>
      <Blocks blocks={blocks!} />
    </>
  );
};

export default Service;
