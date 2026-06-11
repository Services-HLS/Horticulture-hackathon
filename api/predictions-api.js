const API_ORIGIN = "http://horticulture-api-env.eba-cjb2agpv.ap-south-1.elasticbeanstalk.com";
const API_PREFIX = "/api/v1";

export default async function handler(req, res) {
  const pathParam = req.query.path;
  const apiPath = Array.isArray(pathParam) ? pathParam.join("/") : pathParam || "";

  const { path: _path, ...restQuery } = req.query;
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(restQuery)) {
    if (Array.isArray(value)) {
      value.forEach((entry) => searchParams.append(key, entry));
    } else if (value !== undefined) {
      searchParams.append(key, value);
    }
  }

  const queryString = searchParams.toString();
  const targetUrl = `${API_ORIGIN}${API_PREFIX}/${apiPath}${queryString ? `?${queryString}` : ""}`;

  try {
    const headers = {};
    if (req.headers.accept) headers.Accept = req.headers.accept;
    if (req.headers["content-type"]) headers["Content-Type"] = req.headers["content-type"];

    const init = {
      method: req.method,
      headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      init.body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, init);
    const contentType = response.headers.get("content-type") || "application/json";
    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "no-store");
    return res.status(response.status).send(buffer);
  } catch (error) {
    console.error("Predictions API proxy error:", error);
    return res.status(502).json({ error: "Failed to reach predictions backend" });
  }
}
