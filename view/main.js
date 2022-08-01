import { Config } from "../config.js";
import { SelectDOM } from "./selectDOM.mjs";
// Levantar el servidor: json-server -p -w db.json

const component = new SelectDOM();

const getAll = async () => {
  try {
    let res = await fetch(`${Config.API_FAKE}`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    console.log(json);
    json.forEach((el) => {
      component.template.querySelector(".name").textContent = el.nombre;
      component.template.querySelector(".nivel").textContent = el.nivel;
      component.template.querySelector(".edit").dataset.id = el.id;
      component.template.querySelector(".edit").dataset.name = el.nombre;
      component.template.querySelector(".edit").dataset.constellation = el.nivel;
      component.template.querySelector(".delete").dataset.id = el.id;

      let $clone = document.importNode(component.template, true);
      component.fragment.appendChild($clone);
    });

    component.table.querySelector("tbody").appendChild(component.fragment);
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    component.table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p>`
    );
  }
};

document.addEventListener("DOMContentLoaded", getAll);

document.addEventListener("submit", async (e) => {
  if (e.target === component.form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //Create - POST
      try {
        let options = {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              nivel: e.target.nivel.value,
            }),
          },
          res = await fetch(`${Config.API_FAKE}`, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        component.form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}: ${message}</b></p>`
        );
      }
    } else {
      //Update - PUT
      try {
        let options = {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              nivel: e.target.nivel.value,
            }),
          },
          res = await fetch(`${Config.API_FAKE}${e.target.id.value}`, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        component.form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}: ${message}</b></p>`
        );
      }
    }
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    component.title.textContent = "Editar Santo";
    component.form.nombre.value = e.target.dataset.name;
    component.form.nivel.value = e.target.dataset.constellation;
    component.form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(
      `¿Estás seguro de eliminar el id ${e.target.dataset.id}?`
    );

    if (isDelete) {
      //Delete - DELETE
      try {
        let options = {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
          },
          res = await fetch(
            `${Config.API_FAKE}${e.target.dataset.id}`,
            options
          ),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
      }
    }
  }
});
