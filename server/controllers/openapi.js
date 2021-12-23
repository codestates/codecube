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
    console.log('fewrw@#################', response.data.EmplmntInfoStus[1].row)

    res.status(200).send(response.data.EmplmntInfoStus[1].row)
  },
}
