import { Express } from 'express'
import { MongoClient } from 'mongodb'
import { foodRecordsDelete, foodRecordsGet, foodRecordsPost, foodRecordsPut } from './api/users/data/foodRecords'
import { login } from './api/users/login'
import { register } from './api/users/register'
//import { searchFood } from './api/food/searchFood'

/* Set up the routing. Logic should go under './api/'. */
export function setApp (app: Express, client: MongoClient) {

    app.post('/api/users/login', login(app, client))
    app.post('/api/users/register', register(app, client))
//    app.post('/api/food/searchFood', searchFood(app, client))

    app.post('/api/users/data/foodRecords', foodRecordsPost(app, client))
    app.get('/api/users/data/foodRecords', foodRecordsGet(app, client))
    app.put('/api/users/data/foodRecords', foodRecordsPut(app, client))
    app.delete('/api/users/data/foodRecords', foodRecordsDelete(app, client))
}
