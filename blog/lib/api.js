import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

export async function getPostBySlug(slug) {
  try {
    const post = await client.get({
      endpoint: "blogs",
      queries: {
        filters: `slug[equals]${slug}`,
      },
    });
    return post.contents[0];
  } catch (err) {
    console.log("~~ getPostBySlug ~~");
    console.log(err);
  }
}

export async function getAllSlugs(limit = 100) {
  try {
    const slugs = await client.get({
      endpoint: "blogs",
      queries: { fields: "title,slug", orders: "-publishDate", limit: limit },
    });
    return slugs.contents;
  } catch (err) {
    console.log("~~ getAllSlugs ~~");
    console.log(err);
  }
}

export async function getAllPosts(limit = 100) {
  try {
    const posts = await client.get({
      endpoint: "blogs",
      queries: {
        fields: "title,slug,eyecatch,publishDate,content,contentHtml",
        orders: "-publishDate",
        limit: limit,
      },
    });
    return posts.contents;
  } catch (err) {
    console.log("~~ getAllPosts ~~");
    console.log(err);
  }
}

export async function getAllCategories(limit = 100) {
  try {
    const categories = await client.get({
      endpoint: "categories",
      queries: {
        fields: "name,id,slug",
        limit: limit,
      },
    });
    return categories.contents;
  } catch (err) {
    console.log("~~ getAllCategories ~~");
    console.log(err);
  }
}

export async function getAllPostsByCategory(catID, limit = 100) {
  try {
    const posts = await client.get({
      endpoint: "blogs",
      queries: {
        filters: `categories[contains]${catID}`,
        fields: "title,slug,eyecatch,content,contentHtml",
        orders: "-publishDate",
        limit: limit,
      },
    });
    return posts.contents;
  } catch (err) {
    console.log("~~ getAllPostsByCategory ~~");
    console.log(err);
  }
}




 // ------ worksここから ------ //

 

 // ------ worksここから ------ //


 // slug で1件取得
 export async function getWorkBySlug(slug) {
   try {
     console.log("🔍 Fetching work by slug:", slug); // デバッグ用
     const work = await client.get({
       endpoint: "works",
       queries: { filters: `slug[equals]${slug}` },
     });
     console.log("✅ getWorkBySlug result:", work.contents[0]); // デバッグ用
     return work.contents[0];
   } catch (err) {
     console.error("~~ getWorkBySlug error ~~");
     console.error(err);
     return null;
   }
 }

 
 // 全件取得
 export async function getAllWorks(limit = 100) {
   try {
     const works = await client.get({
       endpoint: "works",
       queries: {
         fields: "title,slug,eyecatch,description,publishDate,content",
         orders: "-publishDate",
         limit,
       },
     });
     console.log("✅ getAllWorks result:", works.contents.map(w => w.slug)); // デバッグ用
     return works.contents;
   } catch (err) {
     console.error("~~ getAllWorks error ~~");
     console.error(err);
     return [];
   }
 }

 
 export async function getAllWorkPosts(limit = 100) {
   try {
     const works = await client.get({
       endpoint: "works",
       queries: {
         fields: "title,slug,eyecatch,publishDate,content,contentHtml",
         orders: "-publishDate",
         limit: limit,
       },
     });
     return works.contents;
   } catch (err) {
     console.log("~~ getAllWorkPosts ~~");
     console.log(err);
   }
 }
 

export async function getAllWorkCategories(limit = 100) {
  try {
    const categories = await client.get({
      endpoint: "works-categories",
      queries: {
        fields: "name,id,slug",
        limit: limit,
      },
    });
    return categories.contents;
  } catch (err) {
    console.log("~~ getAllWorkCategories ~~");
    console.log(err);
  }
}
 

export async function getAllWorksByCategory(catID, limit = 100) {
  try {
    const works = await client.get({
      endpoint: "works",
      queries: {
        filters: `categories[contains]${catID}`,
        fields: "title,slug,eyecatch,content,contentHtml",
        orders: "-publishDate",
        limit: limit,
      },
    });
    return works.contents;
  } catch (err) {
    console.log("~~ getAllWorksByCategory ~~");
    console.log(err);
  }
}

