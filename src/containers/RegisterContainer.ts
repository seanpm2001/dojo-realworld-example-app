import { Container } from '@dojo/widget-core/Container';
import { Store } from '@dojo/stores/Store';
import { Register, RegisterProperties } from './../widgets/Register';
import {
	register,
	registerEmailInput,
	registerPasswordInput,
	registerUsernameInput
} from './../processes/loginProcesses';
import { getFeedArticles } from './../processes/feedProcesses';

function getProperties(store: Store<any>, properties: RegisterProperties): RegisterProperties {
	const { get, path } = store;
	return {
		email: get(path('register', 'email')),
		password: get(path('register', 'password')),
		username: get(path('register', 'username')),
		errors: get(path('register', 'errors')),
		inProgress: get(path('register', 'inProgress')),
		onEmailInput: registerEmailInput(store),
		onPasswordInput: registerPasswordInput(store),
		onUsernameInput: registerUsernameInput(store),
		onRegister: () => {
			register(store)().then((result: any) => {
				const errors = get(path('register', 'errors'));
				if (!errors) {
					result.executor(getFeedArticles);
				}
			});
		}
	};
}

export const RegisterContainer = Container(Register, 'state', { getProperties });
