import mongoose from 'mongoose'

import { mongo, mongoOptions } from './../database/database'

mongoose.connect(mongo, mongoOptions)