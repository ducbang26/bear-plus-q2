import { client } from "../lib/contentful";

export async function getPageContent(contentType) {
  try {
    const response = await client.getEntries({ content_type: contentType });
    return response;
  } catch (err) {
    console.error(err);
  }
}
