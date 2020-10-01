import { addStudent } from "./StudentProvider.js";

export const StudentForm = () => {
  render();
};

const eventHub = document.getElementById("hub");

eventHub.addEventListener("click", (event) => {
  if (event.target.id === "add-student-submit") {
    event.preventDefault();
    const firstNameInput = document.getElementById("form-first-name");
    const lastNameInput = document.getElementById("form-last-name");
    const cohortInput = document.getElementById("form-cohort");
    const student = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      cohort: cohortInput.value,
    };
    addStudent(student).then(() => {
      const event = new CustomEvent("studentAdded");
      eventHub.dispatchEvent(event);
    });

    firstNameInput.value = "";
    lastNameInput.value = "";
    cohortInput.value = "";
  }
});

const render = () => {
  const target = document.getElementById("student-form");
  target.innerHTML = `
    <h2>Add Student</h2>
    <form id="student-form">
      <div>
        <input id="form-first-name" placeholder="First Name"/>
      </div>
      <div>
        <input id="form-last-name" placeholder="Last Name"/>
      </div>
      <div>
        <input id="form-cohort" type="number" placeholder="Cohort"/>
      </div>
      <div>
        <button id="add-student-submit">Submit</button>
      </div>
    </form>
  `;
};
