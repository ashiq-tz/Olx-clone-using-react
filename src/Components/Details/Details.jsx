import React, { useState,useEffect } from 'react'
import {useLocation,useParams} from 'react-router-dom'
import { ItemsContext } from '../Context/Item'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'

const Details = () => {

    const location = useLocation()
    const params = useParams()
    const { id } = params
    const stateItem = location.state?.item

    const itemCtx = ItemsContext()

    const [item, setItem] = useState(stateItem || null)

    useEffect(() => {
      if (!item && itemCtx?.items) {
        const found = itemCtx.items.find((it) => it.id === id)
        if (found) setItem(found)
      }
    }, [id, itemCtx?.items])

    const [openModal,setModal] = useState(false)
    const [openModalSell,setModalSell] = useState(false)

    const toggleModal = () => setModal(!openModal)
    const toggleModalSell = () => setModalSell(!openModalSell)
    

  return (
    <div>

        <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
        <Login toggleModal={toggleModal} status={openModal} />

        <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
            <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">

            <img className="object-cover" src={item?.imageUrl} alt={item?.title} />

            </div>

            <div className="flex flex-col relative w-full">
                  <p className="p-1 pl-0 text-2xl font-bold">₹ {item?.price}</p>
                  <p className="p-1 pl-0 text-base">{item?.category}</p>
                  <p className="p-1 pl-0 text-xl font-bold">{item?.title}</p>
                  <p className="p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full">{item?.description}</p>

                  <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between">
                      <p className="p-1 pl-0 font-bold">Seller: {item?.userName}</p>
                      <p className="p-1 pl-0 text-sm">{item?.createdAt ? item.createdAt : 'Date not available'}</p>
                  </div>  

            </div>    

        </div>

        <Sell setItems={(itemCtx).setItems} toggleModal={toggleModal} toggleModalSell={toggleModalSell} status={openModalSell} />
      
    </div>
  )
}

export default Details
