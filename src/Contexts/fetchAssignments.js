const apiURL = "http://localhost:3000/api/";
export function getAssignments(setAssignments) {
    
    fetch(apiURL + "assignments", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data)
    })
  }

export async function postAssignment(data) {
    
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
        console.log(data)
        return data 
    })
    return newAssignment
  }


export async function editAssignment(assignment, data) {
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
        console.log(data)
        return data
    })
      return assignmentToEdit
  }