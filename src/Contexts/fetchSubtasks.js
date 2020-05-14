export async function getSubtasks(apiURL) {
    const newSubtasksList = await fetch(apiURL + "subtasks", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
    return newSubtasksList
}

export async function postSubtask(apiURL, subtask) {
    const newSubtask = await fetch(apiURL + "subtasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subtask),
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
    return newSubtask
}

export async function deleteSubtask(apiURL, subtask, authorId) {
    const delSubtask = await fetch(apiURL + "subtasks/" + subtask._id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authorId)
    }) 
        .then((response) => response.json)
        .then((data) => {
            return data
        })
    return delSubtask
}

export async function editSubtask(apiURL, subtask, authorId) {
    const editSubtask = await fetch(apiURL + "subtasks/" + subtask._id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authorId)
    })
        .then((response) => response.json)
        .then((data) => {
            return data
        })
    return editSubtask
}