require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e88db4366a05f00b7e5ced4').then(res => {
//     return Task.countDocuments({completed: false})
// }).then(numOfDocs => {
//     console.log(numOfDocs);
// }).catch(e => {
//     console.log(e);
// })


// async returns a promise.
// We are chaining async tasks so the first await completes before the next await runs.
// In this case, the doc is deleted and THEN the new count is returned.
const findByIdAndDelete = async (id, completed) => {
    const task  = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed })
    return count
}

findByIdAndDelete('5e88db3e66a05f00b7e5ced3', false).then( res => {
    console.log(res);
}).catch(e => console.log(e))

// 5e88db3e66a05f00b7e5ced3