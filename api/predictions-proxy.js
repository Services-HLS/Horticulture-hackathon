const S3_ORIGIN = "http://horticulture-hackathon.s3-website.ap-south-1.amazonaws.com";
const BACKEND_API_URL = "http://horticulture-api-env.eba-cjb2agpv.ap-south-1.elasticbeanstalk.com/api/v1";
const PROXIED_API_URL = "/predictions-api";

function rewriteHtml(html) {
  return html
    .replace(/(href|src)="\/([^"]*?)"/g, (_, attr, path) => `${attr}="/predictions-app/${path}"`)
    .replaceAll(BACKEND_API_URL, PROXIED_API_URL);
}

function rewriteJs(js) {
  return js.replaceAll(BACKEND_API_URL, PROXIED_API_URL);
}

export default async function handler(req, res) {
  const pathParam = req.query.path;
  const relativePath = Array.isArray(pathParam) ? pathParam.join("/") : pathParam || "";

  const s3Path = relativePath ? `/${relativePath}` : "/";
  const targetUrl = `${S3_ORIGIN}${s3Path}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: req.headers.accept || "*/*",
      },
    });

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const isHtml = contentType.includes("text/html") || s3Path === "/" || relativePath.endsWith(".html");
    const isJs =
      contentType.includes("javascript") ||
      relativePath.endsWith(".js") ||
      relativePath.endsWith(".mjs");

    if (isHtml || isJs) {
      let text = await response.text();
      if (isHtml) text = rewriteHtml(text);
      if (isJs) text = rewriteJs(text);

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", isHtml ? "s-maxage=300, stale-while-revalidate" : "s-maxage=3600, stale-while-revalidate");
      return res.status(response.status).send(text);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(response.status).send(buffer);
  } catch (error) {
    console.error("Predictions proxy error:", error);
    return res.status(502).send("Failed to load predictions content");
  }
}
