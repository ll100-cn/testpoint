import { Modal, Dropdown } from "bootstrap";
import { type Ref } from "vue";

export default {
  modal(element: Ref<HTMLElement>) {
    const raw_element = element.value
    const modal_element = raw_element.closest('.modal')!
    return Modal.getOrCreateInstance(modal_element)
  },

  dropdown(element: Ref<HTMLElement>) {
    const raw_element = element.value
    const dropdown_element = raw_element.closest(".dropdown")!
    const toggle_element = dropdown_element.querySelector("[data-bs-toggle=dropdown]")!
    return Dropdown.getOrCreateInstance(toggle_element)
  },
}
