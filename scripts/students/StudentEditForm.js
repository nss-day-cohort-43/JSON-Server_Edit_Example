import { useStudents, updateStudent } from "./StudentProvider.js";

const eventHub = document.getElementById("hub");
const contentTarget = document.getElementById("student-edit-form");

eventHub.addEventListener("beginEditing", (event) => {
  // put some stuff in the div
  const id = +event.detail;
  const studentToEdit = useStudents().find((student) => student.id === id);
  render(studentToEdit);
});

const render = (studentObj) => {
  contentTarget.innerHTML = `
  <h2>Update Student</h2>
  <form id="student-form">
    <div>
      <input id="edit-form-first-name" value="${studentObj.firstName}" placeholder="First Name"/>
    </div>
    <div>
      <input id="edit-form-last-name" value="${studentObj.lastName}" placeholder="Last Name"/>
    </div>
    <div>
      <input id="edit-form-cohort" value="${studentObj.cohort}" type="number" placeholder="Cohort"/>
    </div>
    <div>
      <button id="edit-student-submit--${studentObj.id}">Submit</button>
    </div>
  </form>
  `;
};

eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("edit-student-submit--")) {
    event.preventDefault();
    // update the api with the new info
    const [pre, id] = event.target.id.split("--");
    const firstNameInput = document.getElementById("edit-form-first-name");
    const lastNameInput = document.getElementById("edit-form-last-name");
    const cohortInput = document.getElementById("edit-form-cohort");

    const updates = {
      id: +id,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      cohort: +cohortInput.value,
    };

    updateStudent(updates).then(() => {
      contentTarget.innerHTML = "";
      const customEvent = new CustomEvent("studentUpdate");
      eventHub.dispatchEvent(customEvent);
    });
  }
});
