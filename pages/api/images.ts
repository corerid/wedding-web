// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllImages, saveImage } from '../../db/operation'
import { mergeImage } from '../../utils/mergeImage'
import lzString from 'lz-string'



type Data = {
    result: any
    hasNextPage: any
    error: string | any
}

export const config = {
    api: {
      responseLimit: false,
    },
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        try {
            const query = req.query;
            const { limit, page } = query;
            if (!limit) {
                res.status(400).json({ result: null, hasNextPage: null, error: "limit must be provided" })
                return
            }

            if (!page) {
                res.status(400).json({ result: null, hasNextPage: null, error: "page must be provided" })
                return
            }
            const offset = (+limit * +page)-(+limit)
            const result = await getAllImages(limit, offset)
            const totalPage = Math.ceil(+result[0].count / +limit)
            let hasNextPage = true;
            if (+page >= totalPage) {
                hasNextPage = false
            }

            res.status(200).json({ result: result, hasNextPage, error: null })
        } catch(err) {
            res.status(400).json({ result: null, hasNextPage: null, error: err })
        }
    } else if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body)

            const mergeImgURL = await mergeImage('https://mookcoreridwedding.vercel.app'+body.template, body.data)
            if (mergeImgURL) {
                const compressUrl = lzString.compressToBase64(mergeImgURL)
                await saveImage(compressUrl, body.author)
            }
            res.status(200).json({ result: null, hasNextPage: null, error: null })
        } catch(err) {
            console.log("Error", err)
            res.status(400).json({ result: null, hasNextPage: null, error: err })
        }
    }   
}
