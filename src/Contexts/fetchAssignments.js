// const apiURL = "http://localhost:3000/api/";
export function getAssignments(apiURL, setAssignments) {

  const assignmentsList = fetch(apiURL + "assignments", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data
      // setAssignments(data)
    })
  return assignmentsList
}

export async function postAssignment(apiURL, data) {

  const newAssignment = fetch(apiURL + "assignments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
  return newAssignment
}


export async function editAssignment(apiURL, assignment, data) {
  const assignmentToEdit = fetch(apiURL + "assignments/" + assignment, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
  return assignmentToEdit
}

export async function deleteAssignment(apiURL, assignment) {
  const delAssignment = await fetch(apiURL + "assignments/" + assignment, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
  return delAssignment
}