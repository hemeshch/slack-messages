const express = require('express')
const axios = require('axios')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.post('/form-submit', (req, res) => {
	axios
		.post('https://hooks.slack.com/', {
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `Name: *${req.body.name}*\n\n Email: *${req.body.email}*`,
					},
				},
			],
		})
		.then(() => {
			res.send('Form submitted!')
		})
		.catch(() => {
			res.send('Form submission failed!')
		})
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})
