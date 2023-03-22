import { pool } from './db'
import _ from 'lodash'


export const getAllImages = async (limit, offset) => {
    try {
        const result = await pool.query('SELECT COUNT(*) OVER (), * FROM image ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset])
        // console.log("SSSS", result.rows)
        const newData = _.map(result.rows, val => ({
            ...val,
          }))
        return result.rows
    } catch(err) {
        console.log("QQWWEEE", err)
        throw err
    }
}

export const saveImage = async (data, author) => {
    try {
        await pool.query('INSERT INTO image ("data", "author") VALUES($1, $2)', [data, author])
        return null
    } catch(err) {
        throw err
    }
}
