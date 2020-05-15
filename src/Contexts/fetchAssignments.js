

export async function getAssignments(apiURL) {

  const assignmentsList = await fetch(apiURL + "assignments", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
  return assignmentsList
}

export async function filterAssignments(apiURL, searchObject) {
  const search = JSON.stringify(searchObject)
  const filteredAssignments = await fetch(`${apiURL}/assignments/${search}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
  return filteredAssignments
}

export async function postAssignment(apiURL, data) {

  const newAssignment = await fetch(apiURL + "assignments", {
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
  const assignmentToEdit = await fetch(apiURL + "assignments/" + assignment, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
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

