import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'

const register =  async (req, res) => {
//instead of try/ catch - using 'express-async-errors' package in server
        const user = await User.create(req.body)
        res.status(StatusCodes.OK).json({user})
}

const login = async (req, res) => {
    res.send('login user')
}

const updateUser = async (req, res) => {
    res.send('updateUser ')
}

export {register, login, updateUser}