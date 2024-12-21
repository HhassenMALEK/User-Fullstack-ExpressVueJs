let { Users } = require("../model/Users")
const sequelize = require("sequelize")
const controller = {}

controller.index = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3

  Users.findAndCountAll({
    limit: limit,
    offset: (page - 1) * limit,
  }).then((data) => {
    res.json({
      totalPages: Math.round(data.count / limit),
      currentPage: page,
      limit: limit,
      links: {
        prev: `http://localhost:3000/users?page=${page - 1}&limit=${limit}`,
        current: `http://localhost:3000/users?page=${page}&limit=${limit}`,
        next: `http://localhost:3000/users?page=${page + 1}&limit=${limit}`
      },
      data: data.rows
    })
  })
}

controller.search = async (req, res) => {
  const searchField = req.query.name
  console.log(searchField)
  // Users.findOne({where : { name : `%${searchField}%`}} ).then( u => {
  Users.findAll({ where: { name: {[sequelize.Op.like]: `%${searchField}%`} } }).then(u => {
    res.json(u)
  })
}

controller.show = (req, res) => {
  Users.findByPk(parseInt(req.params.id)).then((user) => {
    res.json(user)
  }).catch((err) => {
    res.status(400).json({ message: "User not found !" })
  })
}


controller.create = async (req, res) => {
  const user = await Users.create(req.body)
  res.status(201).json(user)
}

controller.update = (req, res) => {
  const { name, age } = req.body

  Users.update({ name, age }, { where: { id: parseInt(req.params.id) } }).then((u) => {
    res.json({ message: "User updated", u })
  }).catch((err) => {
    res.status(400).json({ message: "User not found !" })
  })
}
controller.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.render('edit', { user });
  } catch (err) {
    res.status(500).json({ message: "Erreur", err });
  }
};

controller.destroy = (req, res) => {
  Users.destroy({ where: { id: parseInt(req.params.id) } }).then((u) => {
    res.json({ message: "User deleted", u })
  }).catch((err) => {
    res.status(400).json({ message: "User not found !" })
  })
}

module.exports = controller