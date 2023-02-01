const axios = require('axios')

const getUsers = async () => {
  await axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      let userData = response.data
      userData.map((user, i) => {
        const street = user.address.street
        const city = user.address.city
        const zip = user.address.zipcode
        const zipOnly = zip.slice(0, 5)
        const companyAddress = street.concat(' , ', city, ' , ', zipOnly)
        const phoneOnly = user.phone.replace(/\D/g, '')
        const phone = phoneOnly.slice(1, 11)
        const userObj = {
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ')[1],
          company_name: user.company.name,
          company_full_address: companyAddress,
          website: user.website,
          phone: phone,
        }
        const postObj = {
          userid: 'thety.everton@gmail.com',
          password: ' 25dbc6337f9d420097bff22cf8ba558d',
          outputtype: 'Json',
          users: [userObj],
        }
        axios.post(
          'https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api',
          postObj
        ),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
}

getUsers()
