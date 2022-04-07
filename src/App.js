import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [register, setRegister] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState ('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameBlur = (event) => {
    setName (event.target.value);
  }

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  }

  const handleRegisterChanged = (event) => {
    setRegister(event.target.checked);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('password should contain at least one special character');
      return;

    }

    setValidated(true);
    setError('');


    if (register) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })

    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName ();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }

    event.preventDefault();
  }

  const setUserName = () => {
    updateProfile (auth.currentUser, {
      displayName: name
    })
    .then ( () => {
      console.log ('updating name');
    })
    .catch (error => {
      setError (error.message);
    })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification sent');
      })
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent');
      })
  }


  return (
    <div className='mt-3'>
      <div className="registration w-25 mx-auto">
        <h3>{register ? 'Login' : 'Please Register'}</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {!register && <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter Your Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisterChanged} type="checkbox" label="Already register" />
          </Form.Group>
          <p className='text-danger'>{error}</p>
          <Button onClick={handlePasswordReset} variant="link">Forget password?</Button>
          <Button variant="primary" type="submit">
            {register ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
/* 
 const handleEmailBlur = (event) => {
    console.log(event.target.value);
  }

  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  }

  const handleSubmit = (event) => {
    console.log('form submitted');
    event.preventDefault();
  }
*/


/* 
<form onSubmit={handleSubmit}>
        <br /> <br />
        <input onBlur={handleEmailBlur} type="email" name="" id="" />
        <br /> <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" />
        <br /> <br />
        <input type="submit" value="Login" />
      </form>
*/
