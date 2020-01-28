//import the following and send to 
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt")
const _ = require('lodash')

const sendgridMail = require("@sendgrid/mail")
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)


//commented out selection in case want to bypass sending email through sendgrid

// exports.signup = (req,res) => {
//     // console.log('REQ BODY ON SIGNUP', req.body)
//     const { name, email, password } = req.body

//     User.findOne({ email }).exec((err, user)=> {
//         if(user) {
//             return res.status(400).json({
//                 error: 'Email is taken'
//             })
//         }
//     })
//     let newUser = new User({ name, email, password })

//     newUser.save((err, success) => {
//         if(err) {
//             console.log('SIGNUP ERROR', err)
//             return res.status(400).json({ 
//                 error : err
//             })
//         }
//         res.json({
//              message: 'Signup success! Please signin!'
//         })
//     })
// }

//signup with email activation
exports.signup = (req, res) => {
    const { name, email, password } = req.body

    //find user by email. All emails must be unique
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        //send a token for email activation
        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '30m' })

        // email message uses the following format for sendgrid
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link - Words of Glory',
            html:
                '<h1>Thank you for signing up with Words of Glory</h1>' +
                '<p>To activate your account, please use the following link:</p>' +
                '<br/>' +
                '<p>' + process.env.CLIENT_URL + '/auth/activate/' + token + '</p>' +
                '<hr />' +
                '<p>This email may contain sensitive information</p>' +
                '<p>' + process.env.CLIENT_URL + '</p>'
        }
        //sendgrid email send and message
        sendgridMail.send(emailData).then(sent => {
            return res.json({
                message: `An Email has been sent to ${email}. Please follow the instructions.`
            })
        }).catch(err => {
            return res.json({
                message: err.message
            })
        })
    });
};

// activate the account through email token
exports.accountActivation = (req, res) => {
    //deconstruct req.body in token
    const { token } = req.body
    //verify token with any errors included
    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decode) {
            if (err) {
                console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err)
                return res.status(401).json({
                    error: 'Expired link. You will need to Signup once more'
                })
            }

            // deconstruct user info through the token
            const { name, email, password } = jwt.decode(token)

            // create new instance of user with the following fields
            const user = new User({ name, email, password })

            //allow user activation to be saved
            user.save((err, user) => {
                if (err) {
                    console.log("Save user in account activation error", err)
                    return res.status(401).json({
                        error: 'Error saving user to database. Try signing up again.'
                    })
                }
                return res.json({
                    message: 'You have successfully signed up!'
                });
            })
        })
    } else {
        return res.json({
            message: 'An error has occurred. Please try signing up again.'
        })
    }
};

//signin handling with token through jwt
exports.signin = (req, res) => {
    //
    const { email, password } = req.body

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. You will need to sign up.'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Password and email do not match'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '14d' });
        const { _id, name, email, role } = user

        return res.json({
            token,
            user: { _id, name, email, role }
        })
    });
};

// this makes a user request object to all tokens this is applied to. 
//  Private routing on the back-end, blocks all that isn't private route.
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})

//admin middleware authentication
exports.adminMiddleware = (req, res, cb) => {
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not located'
            })
        }
        if (user.role != 'admin') {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            })
        }

        req.profile = user;
        cb();
    })
}

exports.updatePassword = (req, res) => {
    const { email } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'That email was not found'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '30m' })

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password Reset link - Words of Glory',
            html:
                '<h1>From Words of Glory at No Limits Ministries: </h1>' +
                '<p>To reset your password, please use the following link:</p>' +
                '<br/>' +
                '<p>' + process.env.CLIENT_URL + '/auth/password/reset/' + token + '</p>' +
                '<hr />' +
                '<p>This email may contain sensitive information</p>' +
                '<p>' + process.env.CLIENT_URL + '</p>'
        }

        return User.updateOne({ resetPasswordLink: token }, (err, res) => {
            if (err) {
                console.log('RESET PASSWORD LINK error', err)
                return res.status(400).json({
                    error: 'Database connection error for forgotten password'
                })
            } else {
                sendgridMail.send(emailData).then(sent => {
                    return res.json({
                        message: `An Email has been sent to ${email}. Please follow the instructions. Email is time sensitive and will expire in 30 minutes.`
                    })
                }).catch(err => {
                    return res.json({
                        message: err.message
                    })
                })
            }
        })
    })
}

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err, decode) {
            if (err) {
                return res.status(400).json({
                    error: 'This link expired. Please try again.'
                })
            }
            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Error detected. Please try later.'
                    })
                }

                const newFieldObj = {
                    password: newPassword,
                    resetPasswordLink: ''
                }

                user = _.extend(user, newFieldObj)
                user.save((err, res) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error in reset of user password.'
                        })
                    }
                    res.json({
                        message: 'You are now able to signin with new password'
                    })
                })
            })
        })
    }

}