const db = require('./models/index')
const sequelize = db.sequelize

const users = require('./models/users')
const projects = require('./models/projects')
const stacks = require('./models/stacks')
const project_users = require('./models/project_users')
const user_stacks = require('./models/user_stacks')

project.belongsToMany(User, { through: UserProject })
users.belongsToMany(projects, { through: UserProject })


// user_stacks.hasMany(users)
// user_stacks.hasMany(stacks)

sequelize.sync({ alter: true })
