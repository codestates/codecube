const sequelize = require('./models/index')

const users = require('./models/users')
const projects = require('./models/projects')
const stacks = require('./models/stacks')
const project_users = require('./models/project_users')
const user_stacks = require('./models/user_stacks')

project_users.hasMany(users)
project_users.hasMany(projects)

user_stacks.hasMany(users)
user_stacks.hasMany(stacks)

db.sequelize
.sync({force: true})
.then((result => {
    return projects.create({
        username:'백준우',
        password:'abse1234',
        email:'junu0810@code.com',
        description:'눈누난나'
    })
}))
