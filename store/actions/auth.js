export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const ERROR_MESSAGES = new Map([
	[
		'EMAIL_NOT_FOUND',
		'There is no user record corresponding to this identifier.',
	],
	['INVALID_PASSWORD', 'The password is invalid.'],
	['USER_DISABLED', 'The user account has been disabled by an administrator.'],
	['EMAIL_EXISTS', 'The email address is already in use by another account.'],
	['OPERATION_NOT_ALLOWED', 'Password sign-in is disabled for this project.'],
	[
		'TOO_MANY_ATTEMPTS_TRY_LATER',
		'We have blocked all requests from this device due to unusual activity. Try again later.',
	],
]);

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAv3OuPA9Kn_9x6405sfj2gNTSV2fQB5qY',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			throw new Error(ERROR_MESSAGES.get(errorId));
		}

		const resData = await response.json();
		dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAv3OuPA9Kn_9x6405sfj2gNTSV2fQB5qY',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			throw new Error(ERROR_MESSAGES.get(errorId));
		}

		const resData = await response.json();
		dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
	};
};
