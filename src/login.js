import React, { useState } from 'react';
import { firebase, auth } from './firebase';

const Login = () => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');

	// Sent OTP
	const signin = () => {

		if (mynumber === "" || mynumber.length < 10) return;

		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container',{size: "invisible"});
		auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
			setfinal(result);
			console.log(result)
			console.log(result.verificationId)
			alert("code sent")
			setshow(true);
		})
		.catch((err) => {
			alert(err);
			window.location.reload()
		});
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then((result) => {
			console.log("success")
			console.log(result)
			console.log(result.additionalUserInfo)
			console.log(result.additionalUserInfo.isNewUser)
		}).catch((err) => {
			console.log(err)
			alert("Wrong code");
		})
	}

	console.log(final)
	console.log(typeof final)

	return (
		<div style={{ "marginTop": "200px" }}>
			<center>
				<div style={{ display: !show ? "block" : "none" }}>
					<input value={mynumber} onChange={(e) => {
					setnumber(e.target.value) }}
						placeholder="phone number" />
					<br /><br />
					<div id="recaptcha-container"></div>
					<button onClick={signin}>Send OTP</button>
				</div>
				<div style={{ display: show ? "block" : "none" }}>
					<input type="text" placeholder={"Enter your OTP"}
						onChange={(e) => { setotp(e.target.value) }}></input>
					<br /><br />
					<button onClick={ValidateOtp}>Verify</button>
				</div>
			</center>
		</div>
	);
}

export default Login;
