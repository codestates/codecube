require('dotenv').config()
const axios = require('axios')
const openApi = process.env.OPEN_API

module.exports = {
  joblist: async (req, res) => {
    let response = await axios.get('https://openapi.gg.go.kr/EmplmntInfoStus', {
      params: {
        KEY: openApi,
        type: 'json',
        pIndex: 1,
        pSize: 50,
        JOBCLASS_DIV_CD: 133301,
      },
    })
    if (!response) {
      console.log(
        '\n❗️ openapi/joblist:\n joblist를 받아오는데 실패하였습니다.\n'
      )
    }
    console.log(
      '\n👍 openapi/joblist:\n 총',
      response.data.EmplmntInfoStus[1].row.length,
      '개의 joblist를 받아왔습니다.\n'
    )
    return res.status(200).send(response.data.EmplmntInfoStus[1].row)
  },
}
