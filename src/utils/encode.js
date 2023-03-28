//HTML转义
export function HTMLEncode(html) {
  let temp = document.createElement("div"); // div 也可替换pre
  (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
  const output = temp.innerHTML;
  temp = null;
  return output;
}