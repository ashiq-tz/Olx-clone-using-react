import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'
import Card from '../Card/Card'
import { ItemsContext } from '../Context/Item'
import { fetchFromFirestore } from '../Firebase/Firebase'

const Home = () => {

    const [openModal,setModal] = useState(false)
    const [openModalSell,setModalSell] = useState(false)

    const toggleModal = () => {setModal(!openModal)}
    const toggleModalSell = () => {setModalSell(!openModalSell)}

    const itemsCtx = ItemsContext() //this is (refers) context value

    useEffect(() =>{

      const getItems = async() => {
        const datas = await fetchFromFirestore()
        itemsCtx ?.setItems(datas) //function provided by the context..funct setItems...datas is fetched data from firestore
      }

      getItems()

    },[])

    useEffect(()=>{
      console.log('Updated items:',itemsCtx.items)
    })

  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell}/>
      <Login toggleModal={toggleModal} status = {openModal} />
      <Sell setItems={(itemsCtx).setItems} toggleModalSell={toggleModalSell} status={openModalSell} />

      <Card items={(itemsCtx).items || []}/>
    </div>
  )
}

export default Home
