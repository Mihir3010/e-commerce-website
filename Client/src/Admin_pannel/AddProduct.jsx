import React , {useState}from 'react'
import {Container, Row, Col,Form ,FormGroup} from "reactstrap";
import { toast } from 'react-toastify';
import { db,storage} from "../firebase.config"
import {  ref, uploadBytesResumable,getDownloadURL} from "firebase/storage"
import {collection, addDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

 const [enterTitle, setEnterTitle]= useState("")
 const [enterShortDesc, settEnterShortDesc]= useState("")
 const [enterDescription, setEnterDescription]= useState("")
 const [enterCategory, setEnterCategory]= useState("")
 const [enterPrice, setEnterPrice]= useState("")
 const [enterProductImg, setEnterProductImg]= useState(null)
 const [loading , setLoading] = useState(false)

 const navigate = useNavigate()



 const addProduct = async (e)=>{
   e.preventDefault();
   setLoading(true)

      //  add product to db
   try{
     const docRef = await collection(db,'products')
     const storageRef = ref(storage, `productImages/${Date.now() + setEnterProductImg.name}`)
    const uploadTask = uploadBytesResumable(storageRef,enterProductImg)
    uploadTask.on (()=>{
      toast.error("images not upload ")

    }, ()=>{
       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
       await addDoc(docRef, 
        {
        productName:enterTitle,
        shortdesc:enterShortDesc,
        description:enterDescription,
        category:enterCategory,
        price:enterPrice,
        imgUrl:downloadURL
        }
      
      ) 
       })
       
    })
    setLoading(false)
    toast.success("product succesfully added")
    navigate('/dass/all-product')

   }
   catch(err){
      toast.error("product not added")
      setLoading(false)     
   }
   toast.success("product added succesfully")

 }


  return <section>
     <Container> 
      <Row> 
        <Col lg="12"> 
            {
                loading ? <h4 className='py-5'>Loading...... </h4> : <>
                <h4 className='mb-5'>Add product</h4>
         <Form onSubmit={addProduct}> 
          <FormGroup className= "form_group"> 
             <span>Product Title</span>
             <input type='text' placeholder='Double sofa' value={enterTitle} onChange={e=> setEnterTitle (e.target.value)} />
          </FormGroup>
          <FormGroup className= "form_group"> 
             <span>Short Description</span>
             <input type='text' placeholder='lorem.....' value={enterShortDesc} onChange={e=> settEnterShortDesc (e.target.value)}   />
          </FormGroup>
          <FormGroup className= "form_group"> 
             <span> Description</span>
             <input type='text' placeholder='Description' value={enterDescription} onChange={e=> setEnterDescription (e.target.value)} required/>
          </FormGroup>
          <div className='d-flex align-items-center justify-content-between gap-5'>
          <FormGroup className= "form_group w-50"> 
             <span> Price</span>
             <input type='number' placeholder='$100' value={enterPrice} onChange={e=> setEnterPrice (e.target.value)} required/>
          </FormGroup>
          <FormGroup className= "form_group w-50  "> 
             <span> Category</span>
             <select className='w-100 p-2' value={enterCategory} onChange={e=> setEnterCategory (e.target.value)} required>
               <option> Select category</option>
              <option value="chairs">Chair</option>
              <option value="sofa">Sofa</option>
              <option value="table">Table</option>
              <option value="lamp">Lamps</option>
             </select>
          </FormGroup>
         
          </div>

          <div>
          <FormGroup className= "form_group"> 
             <span> Product Image</span>
             <input type='file' onChange={e=>setEnterProductImg(e.target.files[0])}  required/>
          </FormGroup>
          </div>
           <button className='buy_btn' type='submit'>
             Add Product
           </button>
          
         </Form>
                

                </>

            }
        </Col>
      </Row>
     </Container>
  </section>
}

export default AddProduct
