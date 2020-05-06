// Parsing the .env file
require('dotenv').config()

// Server setup
const express = require('express')
const app = express()
const mongoose = require('mongoose')


const port = process.env.PORT || 8080;
const path = require('path');


mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

// Routers
const usersRouter = require('./routes/users')
const assignmentsRouter = require('./routes/assignments')
const subtasksRouter = require('./routes/subtasks')

// Express use setup, url we use for api endpoints
app.use(express.json());
app.use('/api/users', usersRouter)
app.use('/api/assignments', assignmentsRouter)
app.use('/api/subtasks', subtasksRouter)



app.get('/', (req, res) => {
      return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

app.listen(port, () => console.log('Server has started'))



// // @ts-nocheck
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const getDate = require('./DateManager.js')
// const app = express();
// const port = process.env.PORT || 8080;
// const filePath = './Assignments.json'

// app.use(express.json());


// // If home, send UI
// // app.get('/', (req, res) => {
// //   return res.sendFile(path.join(__dirname, 'build', 'index.html'));
// // });

// // If GET, send entire Assignments.people

// app.get('/api/assignments', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err)
//       next(err)
//     }
//     const assignData = JSON.parse(data)
//     return res.status(200).json(assignData.assignments)
//   })
// });


// // If GET, send specific assignment
// app.get('/api/assignments/:id', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err)
//       next(err)
//     }
//     const { assignments } = JSON.parse(data)
//     const assignment = assignments.find(a => a.id === req.params.id)
//     if (!assignment) return res.status(404).json({ error: { message: "Could not find an assignment with that ID..." } });
//     return res.status(200).json([assignment])
//   })
// })

// // If POST, post assigment to assignments
// app.post('/api/assignments', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err)
//       next(err)
//     }
//     const assignData = JSON.parse(data)
//     const newAssignment = {
//       id: [...Array(5)].map(i => (~~(Math.random() * 36)).toString(36)).join(''),
//       name: req.body.name,
//       desc: req.body.desc,
//       date: getDate()
//     };
//     assignData.assignments.unshift(newAssignment)
//     fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
//       if (err) {
//         console.error(err)
//         next(err)
//       }
//     })
//     return res.status(201).json(assignData.assignments)
//   })
// })


// // If POST to ID, post subtask to assignment
// app.post('/api/assignments/:id', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if(err) {
//       console.error(err)
//       next(err)
//     }
//     const assignData = JSON.parse(data)
//     const assignment = assignData.assignments.find(a => a.id === req.params.id)
//     if (!assignment) return res.status(404).json({ error: { message: "Could not find an assignment with that ID..." }})
//     if (!assignment.subtasks) assignment.subtasks = []
//     req.body.subId = [...Array(3)].map(i => (~~(Math.random() * 36)).toString(36)).join(''),
//     req.body.status = "new"
//     assignment.subtasks.push(req.body)
//     fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
//       if (err) {
//         console.error(err)
//         next(err)
//       }
//     })
//     return res.status(200).json(assignData.assignments)
//   })
// })


// // If PUT, change attributes of assignment in that position
// app.put('/api/assignments/:id', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err)
//       next(err)
//     }
//     const assignData = JSON.parse(data)
//     const assignment = assignData.assignments.find(a => a.id === req.params.id)
//     if (!assignment) return res.status(404).json({ error: { message: "Could not find an assignment with that ID..." }});
//     assignment.name = req.body.name
//     assignment.desc = req.body.desc

//     fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
//       if (err) {
//         console.error(err)
//         next(err)
//       }
//     })
//     return res.status(200).json(assignData.assignments)
//   })
// })

// //If PUT to subID, change attributes of that subtask
// app.put('/api/assignments/:id/:subId', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err)
//       next(err)
//     }
//     const assignData = JSON.parse(data)
//     const assignment = assignData.assignments.find(a => a.id === req.params.id)
//     if (!assignment) return res.status(404).json({ error: { message: "Could not find an assignment with that ID..." }})
//     if (assignment.subtasks) {
//       const subtask = assignment.subtasks.find(s => s.subId === req.params.subId)
//       if (!subtask) return res.status(404).json({ error: { message: "Could not find a subtask with that ID..." }})
//       subtask.desc = req.body.desc
//       subtask.status = req.body.status
  
//       fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
//         if (err) {
//           console.error(err)
//           next(err)
//         }
//       })
//     } else {
//       return res.status(404).json({ error: { message: "Could not find a subtask with that ID..." }})
//     }
//     return res.status(200).json(assignData.assignments)
//   })
// })

// // If DELETE, delete assignment of that ID
// app.delete('/api/assignments/:id', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err)
//       next(err)
//     }
//     const assignData = JSON.parse(data)
//     const assignmentIndex = assignData.assignments.findIndex(a => a.id === req.params.id);
//     if (assignmentIndex === -1) return res.status(404).json({ error: { message: "Could not find an assignment with that ID..." } })
//     assignData.assignments.splice(assignmentIndex, 1)
//     fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
//       if (err) {
//         console.error(err)
//         next(err)
//       }
//     })
//     return res.status(200).json(assignData.assignments)
//   })
// })

// // If DELETE:id/:subid, delete subtask in that assignment
// app.delete('/api/assignments/:id/:subId', (req, res, next) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err)
//       next(err)
//     }
//     const assignData = JSON.parse(data)
//     const assignment = assignData.assignments.find(a => a.id === req.params.id)
//     if (!assignment) return res.status(404).json({ error: { message: "Could not find an assignment with that ID..." }})
//     if (!assignment.subtasks) return res.status(404).json({ error: { message: "Assignment has no subtasks..." }})
//     const subtaskIndex = assignment.subtasks.findIndex(s => s.subId === req.params.subId)
//     if (subtaskIndex === -1) return res.status(404).json({ error: { message: "Could not find an subtask with that ID..." }})
//     assignment.subtasks.splice(subtaskIndex, 1)
//     fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
//       if (err) {
//         console.error(err)
//         next(err)
//       }
//     })
//     return res.status(200).json(assignData.assignments)
//   })
// })

// // If ERROR, return errormsg
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).json({ error: { message: "Ran into a server error, please reload page" } })
// })

// app.use(express.static(path.join(__dirname, 'build')));

// // Run server
// app.listen(port, () => {
//   console.log(`server started on port: ${port}`);

// });