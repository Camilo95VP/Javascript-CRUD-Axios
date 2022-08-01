/**
 * Clase modelo para seleciionar elementos del DOM
 * @author Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class SelectDOM {
  table;
  form;
  title;
  template;
  fragment;
  /**
   * Constructor de clase para iniciar valiables
   */
  constructor() {
    this.table = document.querySelector(".crud-table");
    this.form = document.querySelector(".crud-form");
    this.title = document.querySelector(".crud-title");
    this.template = document.getElementById("crud-template").content;
    this.fragment = document.createDocumentFragment();
  }
  get table() {
    return this.table;
  }
  get form() {
    return this.form;
  }
  get title() {
    return this.title;
  }
  get template() {
    return this.template;
  }
  get fragment() {
    return this.fragment;
  }
}
