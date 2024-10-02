export class HttpService {
  async uploadFile(route, file, additionalData = {}) {
    let data = new FormData();
    data.append("file", file);
    data.append("data", JSON.stringify(additionalData));
    let options = {
      method: "post",
      body: data,
    };
    let response = await fetch(`${route}`, options);
    let is_ok = response.status === 200;
    let is_json =
      response.headers.get("Content-Type").indexOf("application/json") >= 0;
    if (!is_ok && !is_json) {
      throw new Error("Unexpected Error");
    }

    if (is_json) {
      let json_body = await response.json();
      if (json_body.status !== 200) {
        throw new Error(json_body.message);
      }
      return json_body;
    }
  }
}
