import React, { useState, useEffect } from 'react'
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from 'react-icons/fa'
import { useFetch } from './useFetch'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {

	const { loading, data, error, setReload } = useFetch(url);
	const [person, setPerson] = useState(null);
	const [title, setTitle] = useState('name');
	const [value, setValue] = useState('random name');


	const handleValue = (e) => {
		if (e.target.classList.contains('icon')) {
			const newValue = e.target.dataset.label;
			console.log('newValue :>> ', newValue);
			console.log('person :>> ', person);
			setTitle(newValue);
			setValue(person[newValue]);
		}
	}


	useEffect(() => {

		if (data) {

			let newPerson = data.results[0];
			const { phone, email } = newPerson;
			const { large: image } = newPerson.picture;
			const { password } = newPerson.login;
			const { first, last } = newPerson.name;
			const { age } = newPerson.dob;
			const { street: { number, name } } = newPerson.location;
			newPerson = {
				image,
				phone,
				email,
				password,
				age,
				street: `${number} ${name}`,
				name: `${first} ${last}`
			}

			setPerson(newPerson);
			setTitle('name');
			setValue(newPerson.name);
		}
	}, [data]);

	return (
		<main>
			<div className='block bcg-black'></div>
			<div className='block'>
				<div className='container'>
					<img src={(person && person.image) || defaultImage} alt='random person' className='user-img' />
					<p className='user-title'>my {title} is</p>
					<p className="user-value">{value}</p>
					<div className='values-list'>
						<button className='icon' data-label='name' onMouseOver={handleValue}>
							<FaUser />
						</button>
						<button className='icon' data-label='email' onMouseOver={handleValue}>
							<FaEnvelopeOpen />
						</button>
						<button className='icon' data-label='age' onMouseOver={handleValue}>
							<FaCalendarTimes />
						</button>
						<button className='icon' data-label='street' onMouseOver={handleValue}>
							<FaMap />
						</button>
						<button className='icon' data-label='phone' onMouseOver={handleValue}>
							<FaPhone />
						</button>
						<button className='icon' data-label='password' onMouseOver={handleValue}>
							<FaLock />
						</button>
					</div>
					<button className='btn' type='button' onClick={() => setReload(true)}>
						{loading ? 'loading ...' : 'random user'}
					</button>
				</div>
			</div>
		</main>
	)
}

export default App
