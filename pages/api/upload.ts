// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import fs from 'fs'
// Load the AWS SDK for Node.js
var S3 = require('aws-sdk/clients/s3');
// Set the region 
const bucketName = "coreridmook-wedding"
const region = 'ap-southeast-1'
const accessKeyId = 'AKIARG2KFX4574NPZAUG'
const secretAccessKey = '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'


// Create S3 service object
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

export const uploadFile = (file: { fileName: any; data: any }) => {
  // const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: file.data,
    Key: file.fileName
  }

  return s3.upload(uploadParams).promise()
}

type Data = {
  message: string
  error: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body)
  try {
    var buf = Buffer.from(body.data.replace(/^data:image\/\w+;base64,/, ""),'base64')

    const file = {
      fileName: body.author+".png",
      data: buf
    }

    await uploadFile(file)

    res.status(200).json({ message: 'success', error: null })
  } catch(err) {
    res.status(500).json({ message: 'fail', error: err })
  }
}
