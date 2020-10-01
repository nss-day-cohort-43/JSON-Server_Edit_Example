let students = [];

export const useStudents = () => {
  return students.slice();
};

export const getStudents = () => {
  return fetch("http://localhost:8088/students")
    .then((res) => res.json())
    .then((data) => {
      students = data;
    });
};

export const addStudent = (student) => {
  return fetch("http://localhost:8088/students", {
    method: "POST",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getStudents);
};

export const updateStudent = (student) => {
  return fetch(`http://localhost:8088/students/${student.id}`, {
    method: "PUT",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getStudents);
};
