import React from 'react'
import { Container,Row, Col } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import {db} from "../firebase.config"
import { doc , deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'


const AllsProduct = () => {
 const {data: productData, loading} = useGetData("products");
 const deleteProduct = async id => {
  await deleteDoc(doc(db,'products', id))
  toast.success("deleted product !")

 }


  return <section> 
    <Container> 
      <Row> 
        <Col lg="12">
        <table className='table'>
          <thead>
            <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th> Action </th>
            </tr>
          </thead>
          <tbody>
             {
               loading ? ( <h4 className='py-5 text-center fw-bold'>Loading........</h4> ) :(
               
                productData.map(item=>(
                 <tr key={item.id}>
               <td> <img src={item.imgUrl} alt="" /></td>
               <td>{item.title}</td>
               <td>{item.category}</td>
               <td>${item.price}</td>
               <td><button onClick={()=>{deleteProduct(item.id)}} className='btn btn-danger'>Delete </button></td>
             </tr>
                ))
                ) }
             
          </tbody>
        </table>
        </Col>
      </Row>
    </Container>
  </section>
}

export default AllsProduct
