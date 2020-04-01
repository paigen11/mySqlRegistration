import User from '../sequelize';
import bcrypt from 'bcrypt';
import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';

module.exports = app => {

  app.post('/loginUser', (req, res) => {
    User.findOne({
      where: {
        username: req.body.params.username,
      },
    })
      .then(user => {
        if (req.body.params.password == false) {
          console.log('password required');
          res
            .status(400)
            .send({
              auth: false,
              token: null,
              message: 'password required'
            });
        } else if (user === null) {
          console.log('bad username');
          //res.status(400).json('bad username');
          res.status(400).send({
            auth: false,
            token: null,
            message: "Not finding username '" + req.body.params.username + "'."
          });
        } else {
          bcrypt.compare(req.body.params.password, user.password)
            .then(response => {
              if (response === true) {
                const token = jwt.sign({ id: user.username }, jwtSecret.jwtSecret, {
                  expiresIn: 86400,
                });
                console.log('user found & logged in');
                res
                  .status(200)
                  .send({
                    auth: true,
                    token,
                    message: 'success'
                  });
              } else {
                console.log('incorrect password');
                res.status(400).send({
                  auth: false,
                  token: null,
                  message: 'Incorrect password. ',
                });
              }
            }).catch(err => {
              console.log('problem bcrypt.compare', err.message);
              res.status(500).json(err.message);
            });
        }
      })
      .catch(err => {
        console.log('bcrypt.compare err');
        console.log(err.message);
        res.status(500).json(err.message);
      });
  });
};
