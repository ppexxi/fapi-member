!function(){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),document.addEventListener("click",(e=>{if(e.target.matches(".levels .remove")){let t=e.target.parentNode.getAttribute("data-id");Swal.fire({html:"<strong>Opravdu si přejete odstranit členskou sekci/úroveň?</strong><br><br>Smazáním sekce/úrovně nedojde ke smazání stránek v sekci/úrovni.",showDenyButton:!0,confirmButtonText:"Smazat",denyButtonText:"Ponechat",customClass:{confirmButton:"removeConfirmButton",denyButton:"removeDenyButton"}}).then((e=>{if(e.isConfirmed){let e=document.getElementById("LevelRemoveForm");e.querySelector('[name="level_id"]').setAttribute("value",t),e.submit()}else e.isDenied}))}})),document.addEventListener("click",(e=>{if(e.target.matches(".levels .edit")){let t=e.target.parentNode.querySelector("span").innerText,r=e.target.parentNode.getAttribute("data-id");Swal.fire({input:"text",inputLabel:"Nový název",inputValue:t,showDenyButton:!0,confirmButtonText:"Přejmenovat",denyButtonText:"Ponechat"}).then((e=>{if(e.isConfirmed){let t=document.getElementById("LevelEditForm");t.querySelector('[name="level_id"]').setAttribute("value",r),t.querySelector('[name="name"]').setAttribute("value",e.value),t.submit()}else e.isDenied}))}})),document.addEventListener("click",(e=>{if(e.target.matches("form.pages button")){e.preventDefault();let t=d(),r=e.target.closest("form");r.querySelector('[name="level_id"]').value=t,r.submit()}})),document.addEventListener("click",(t=>{if(t.target.matches(".levels a")){t.preventDefault();let r=t.target.parentNode;Array.from(document.querySelectorAll(".levels li.selected")).forEach((e=>{e.classList.remove("selected")})),r.classList.add("selected"),o(),l(),n(),e()}})),document.addEventListener("DOMContentLoaded",(e=>{d()&&o(),l(),r(),n()}));const e=()=>{let e=d();Array.from(document.querySelectorAll(".subsubmenuitem")).forEach((t=>{let r=t.getAttribute("href");new RegExp("&level=").test(r)?t.setAttribute("href",r.replace(/(&level=[0-9]*)/,`&level=${e}`)):t.setAttribute("href",`${r}&level=${e}`)}))},t=e=>{if(!window.hasOwnProperty("LevelToPage")){let e=document.getElementById("LevelToPage");e&&(window.LevelToPage=JSON.parse(e.innerText))}return window.hasOwnProperty("LevelToPage")&&window.LevelToPage.hasOwnProperty(e)?window.LevelToPage[e]:[]},r=()=>{let e=document.querySelector(".removePagesForm .danger");e&&(e.disabled=!0);let t=document.querySelector(".addPagesForm .btn");t&&(t.disabled=!0)},n=()=>{if(d()){let e=document.querySelector(".removePagesForm .danger");e&&null!==document.querySelector(".removePagesForm .onePage")&&(e.disabled=!1);let t=document.querySelector(".addPagesForm .btn");t&&null!==document.querySelector(".addPagesForm .onePage")&&(t.disabled=!1)}},o=()=>{let e=document.querySelector(".removePagesForm");if(!e)return;let r=t(d()),o=r.reduce(((e,t)=>e+"&include[]="+t),""),l=e.querySelector(".inner");l.innerHTML="",r.length<=0?l.insertAdjacentHTML("afterbegin","<p>Sekce/úroveň nemá přiřazené stránky.</p>"):(s(e),fetch("/?rest_route=/wp/v2/pages&per_page=100&context=embed"+o).then((e=>e.json())).then((t=>{a(l,t),i(e),n()})))},l=()=>{let e=document.querySelector(".addPagesForm");if(!e)return;let r=t(d());Array.from(e.querySelectorAll('input[type="checkbox"]')).forEach((e=>{let t=parseInt(e.value);r.indexOf(t)>=0?e.readOnly=!0:e.readOnly=!1}))},a=(e,t)=>{let r=t.map((e=>`<div class="onePage"><input type="checkbox" name="toRemove[]" value="${e.id}"> ${e.title.rendered}</div>`));e.innerHTML="",e.insertAdjacentHTML("beforeend",r.join(""))},d=()=>{let e=document.querySelector(".levels li.selected");return e?parseInt(e.getAttribute("data-id")):null},s=e=>{e.classList.add("loading")},i=e=>{e.classList.remove("loading")}}();