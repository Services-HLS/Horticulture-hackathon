const S3_ORIGIN = "http://horticulture-hackathon.s3-website.ap-south-1.amazonaws.com";

function rewriteHtml(html) {
  return html.replace(/(href|src)="\/([^"]*?)"/g, (_, attr, path) => {
    return `${attr}="/predictions-app/${path}"`;
  });
}

export default async function handler(req, res) {
  const pathParam = req.query.path;
  const relativePath = Array.isArray(pathParam)
    ? pathParam.join("/")
    : pathParam || "";

  const s3Path = relativePath ? `/${relativePath}` : "/";
  const targetUrl = `${S3_ORIGIN}${s3Path}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: req.headers.accept || "*/*",
      },
    });

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const isHtml = contentType.includes("text/html");

    if (isHtml) {
      const html = await response.text();
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
      return res.status(response.status).send(rewriteHtml(html));
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
