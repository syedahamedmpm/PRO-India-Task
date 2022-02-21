const baseUrl = "https://uiexercise.onemindindia.com/api/"




export function url() {
  return baseUrl;
}

  export function productGet(url) {
    let token = localStorage.getItem("token");
    return fetch(baseUrl + url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    });
  }

  export function productAdd(body,url) {
    console.log(body)
    let token = localStorage.getItem("token");
    console.log(token)
    return fetch(baseUrl + url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        ...body,
      }),
    });
  }

  