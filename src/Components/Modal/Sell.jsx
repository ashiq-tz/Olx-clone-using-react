import { Modal, ModalBody } from 'flowbite-react'
import React, { useState } from 'react'
import Input from '../Input/Input'
import { userAuth } from '../Context/Auth'
import { addDoc, collection } from 'firebase/firestore'
import { fetchFromFirestore, fireStore } from '../Firebase/Firebase'

function Sell(props) {

    const {toggleModalSell,status,setItems} = props

    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")
    const [price,Setprice] = useState(0)
    const [description,setDescription] = useState("")

    const [submitting,setSubmitting] = useState(false)

    const auth = userAuth()

    const handleSubmit = async(event) => {
        event.preventDefault()

        if(!auth?.user){
            alert('please login to continue')
            return
        }

        setSubmitting(true)

        const trimmedTitle = title.trim()
        const trimmedCategory = category.trim()
        const trimmedPrice = price.trim()
        const trimmedDescription = description.trim()

        if(!trimmedTitle || !trimmedCategory ||!trimmedPrice || !trimmedDescription  ){
            alert('All fields are required');
            setSubmitting(false)
            return;
        }

        try {

            await addDoc(collection(fireStore,'products'),{
                title,
                category,
                price,
                description,
                userId:auth.user.uId,
                userName:auth.user.diplayName || 'Anonymous',
                createdAt: new Date().toDateString()
            })

            const datas = await fetchFromFirestore()
            setItems(datas)
            
            toggleModalSell()
            
        } catch (error) {
            console.log(error)
            alert('failed to add items to firestore')
        }finally{
            setSubmitting(false)
        }
    }

  return (
    <div>
      <Modal  theme={{
             content: {
                base: "relative w-full p-4 md:h-auto",
                inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
            },
        }}  onClick={toggleModalSell} show={status}  className="bg-black"  position={'center'}  size="md" popup= {true}> 

        <ModalBody className="bg-white h-96 p-0 rounded-md"   onClick={(event) => event.stopPropagation()}>

            <div className="p-6 pl-8 pr-8 pb-8">
                 <p  className="font-bold text-lg mb-3">Sell Item</p>

                 <form onSubmit={handleSubmit}>
                    <Input setInput={setTitle} placeholder='title'  />
                    <Input setInput={setCategory} placeholder='category' />
                    <Input setInput={Setprice} placeholder='price'  />
                    <Input setInput={setDescription} placeholder='description'  />

                    {submitting?
                    <div>
                        <p>loading</p>
                    </div>
                    :
                    <div>
                        <p>Sell Item</p>
                    </div>
                    }

                 </form>
            </div>

        </ModalBody>

      </Modal>


    </div>
  )
}

export default Sell
