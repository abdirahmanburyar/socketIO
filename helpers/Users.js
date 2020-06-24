class UsersClass {
    constructor(){
        this.users = []
    }
    addToUsers (id,fullName,room,email) {
        const user = {id,fullName,room,email}
        this.users.push(user)
        return user
    }
    getUsersList (room) {
        return this.users.filter(user => user.room === room)
            .map(user => {
                return {
                    ...user,
                }
            })
    }
    removeUser(id){
        const getId = this.getUser(id)
        if(getId){
            this.users = this.users.filter(user => user.id !== id)
        }
        return getId
    }
    getUser(id){
        return this.users.filter(user => user.id === id)[0]
    }
}

module.exports = {
    UsersClass
}