import { getStudents, useStudents } from "./StudentProvider.js";

export const StudentList = () => {
  getStudents().then(() => {
    const students = useStudents();
    render(students);
  });
};

const eventHub = document.getElementById("hub");

const render = (students) => {
  const contentTarget = document.getElementById("students-list");
  contentTarget.innerHTML = students
    .map((student) => {
      return `
      <div id="student--${student.id}" class="student-card">
        <h3>${student.firstName} ${student.lastName}</h3>
        <h3>Cohort ${student.cohort}</h3>
        <button id="student-edit--${student.id}">Edit</button>
      </div>
    `;
    })
    .join("");
};

eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("student-edit--")) {
    const [pre, id] = event.target.id.split("--");
    const customEvent = new CustomEvent("beginEditing", {
      detail: id,
    });
    eventHub.dispatchEvent(customEvent);
  }
});

eventHub.addEventListener("studentUpdate", (event) => {
  const students = useStudents();
  render(students);
});

eventHub.addEventListener("studentAdded", (event) => {
  const students = useStudents();
  render(students);
});
