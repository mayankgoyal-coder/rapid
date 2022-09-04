const users = []
//addusers,removeusers,getusers,getusersinroom


const addUser = ({id, username,room}) => {
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return {
            error: 'Username and room are required'
        }
    }
    //check rhe existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //Validate username 
    if(existingUser){
        return{
            error : 'Username is in use!'
        }
    }

    // store user
    const user = {id, username, room}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user)=> user.id === id)

        if(index !== -1){
            return users.splice(index,1)[0]
        }
    }

    const getUser =(id)=>{
        return users.find((user)=> user.id ===id)
    }
 const getUserInRoom = (room)=>{
    room = room.trim().toLowerCase()
    return users.filter((user)=> user.room ===room)
 }

 module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
 }

// addUser({
//     id:22,
//     username:'mayank',
//     room : 'kailaras'
// })
// addUser({
//     id:42,
//     username:'rishabh',
//     room : 'kailaras'
// })
// addUser({
//     id:22,
//     username:'sahil',
//     room : 'delhi'
// })
// console.log(users)

// const removedUser = removeUser(22)
// console.log(removedUser)
// console.log(users)

// const user = getUser(42)
// console.log(user)

// const userList = getUserInRoom('kailaras')
// console.log(userList)
