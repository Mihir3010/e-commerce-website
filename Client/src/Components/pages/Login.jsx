import React ,{useState}from 'react'
import Helmet from '../Helmet/Helmet'
import {Container, Row ,Col, Form,FormGroup} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/login.css'
import logo from  "../../assets/images/logo.png"

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import {toast} from "react-toastify"



const Login = () => {

   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [loading , setLoading] = useState(false)
   const navigate= useNavigate()

   const singIn = async (e)=>{
     e.preventDefault()
     setLoading(true)

     try{ 
       
       const userCredential = await signInWithEmailAndPassword(auth,email,password)
       const user = userCredential.user
       console.log(user)
       setLoading(false)
       toast.success("sucessfully Login")
       navigate('/cart')
       
     }catch (error){
       setLoading(false)
       toast.error(error.message)
     }
   }
    
    

  return (
     <Helmet title="login">
      <section> 
        <Container> 
          <Row>
             {
               loading ? <Col lg='12' className= "text-center">
                 <h5 className='fw-bold'> Loading.....</h5>
               </Col> : <Col lg="6" className= "m-auto text-center">
               
            <img src= {logo} height="50px" alt="" />
              <h3 className='fw-bold mb-4 pt-4'>Login</h3>
             
              <Form action="/Login" className="auth_form " onSubmit={singIn}> 
                <FormGroup className= "form_group">
                  <input type="email"  placeholder='Enter your email' value={email} onChange={e=> setEmail (e.target.value)}/> 
                </FormGroup>
                <FormGroup className= "form_group">
                  <input type="password"  placeholder='Enter your password' value={password} onChange={e=> setPassword (e.target.value)}/> 
                </FormGroup>
                <button type='submit'  className="buy_btn auth_btn">Login</button>
                <p>Don't have an account ? {""}
                 <Link to ="/Signup"> Create an new Account </Link></p>
              </Form>
            
            </Col>
               
             }
          </Row>
        </Container>
      </section>
     </Helmet>
  )
}

export default Login
