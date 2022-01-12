import apiUrl from '../apiConfig'
import axios from 'axios'

export const checkoutAPI = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up/',
		data: {
			credentials: {
				email: credentials.email,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}