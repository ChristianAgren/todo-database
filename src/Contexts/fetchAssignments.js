
const apiURL = "http://localhost:3000/api/";

export async function getAssignments(apiUrl) {
    const newAssignmentList = await fetch(apiURL + "assignments", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        return data
    })

    return newAssignmentList
  }