function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      // メモの入力フォームをリセットするため
      const formText = document.getElementById("content");
      // メモとして描画する部分のHTML
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // HTMLを追加
      list.insertAdjacentHTML("afterend", HTML);
      // メモの入力フォームに入力されたままの文字を、空の文字列に上書き(リセット)
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
