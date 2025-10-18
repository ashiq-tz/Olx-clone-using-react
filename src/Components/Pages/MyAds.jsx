import React, { useEffect, useState } from 'react'
import { ItemsContext } from '../Context/Item'
import { userAuth } from '../Context/Auth'
import { fireStore, fetchFromFirestore } from '../Firebase/Firebase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'
import MyAdsCard from '../Card/MyAdsCard'
import EditModal from '../Modal/EditModal'

import ConfirmModal from '../Modal/ConfirmModal'
import { toast,ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const MyAds = () => {
  const { items, setItems } = ItemsContext()
  const auth = userAuth()

  const [myAds, setMyAds] = useState([])
  const [openModal, setModal] = useState(false)
  const [openSellModal, setModalSell] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [product, setProduct] = useState(null)
  const [image, setImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)


  const toggleModal = () => setModal(!openModal)
  const toggleModalSell = () => setModalSell(!openSellModal)
  const toggleModalEdit = () => setEditModal(!editModal)

  useEffect(() => {
    if (auth.user && items) {
      const filtered = items.filter((item) => item.userId === auth.user.uid)
      setMyAds(filtered)
    }
  }, [items, auth.user])

  // handle edit
  const handleImageUpload = (e) => {
    if (e.target.files) setImage(e.target.files[0])
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
  
    try {
      let updatedProduct = { ...product }
  
      if (image) {
        const readImageAsDataUrl = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
        }
  
        try {
          const imageUrl = await readImageAsDataUrl(image)
          updatedProduct.imageUrl = imageUrl
        } catch (err) {
          console.error('Error reading image:', err)
          alert('Failed to read new image')
          setSubmitting(false)
          return
        }
      }
  
      const docRef = doc(fireStore, 'products', product.id)
      await updateDoc(docRef, updatedProduct)
  
      // Refresh list
      const updated = await fetchFromFirestore()
      setItems(updated)
  
      toggleModalEdit()
      setImage(null)
      toast.success('Product updated successfully!')
    } catch (err) {
      console.error('Update failed:', err)
      toast.error('Failed to update product.')
    } finally {
      setSubmitting(false)
    }
  }
  

  // handle remove 
  const onRemove = (id) => {
    setDeleteId(id)
    setConfirmOpen(true)
  }
  
  const handleConfirmDelete = async () => {
    try {
      await deleteDoc(doc(fireStore, 'products', deleteId))
      const updated = await fetchFromFirestore()
      setItems(updated)
      toast.success('Ad deleted successfully!')
    } catch (err) {
      console.error('Delete failed:', err)
      toast.error('Failed to delete ad.')
    } finally {
      setConfirmOpen(false)
      setDeleteId(null)
    }
  }
  

  const onEdit = (product) => {
    setProduct(product)
    toggleModalEdit()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell setItems={setItems} toggleModalSell={toggleModalSell} status={openSellModal} />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Ads</h1>

        {myAds.length === 0 ? (
          <p className="text-gray-600">You haven’t posted any ads yet.</p>
        ) : (
          <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
            {myAds.map((ad) => (
              <MyAdsCard key={ad.id} product={ad} onEdit={onEdit} onRemove={onRemove} />
            ))}
          </div>
        )}
      </div>

      {editModal && (
        <EditModal
          toggleModalEdit={toggleModalEdit}
          status={editModal}
          product={product}
          setProduct={setProduct}
          handleEditSubmit={handleEditSubmit}
          handleImageUpload={handleImageUpload}
          image={image}
          setImage={setImage}
          submitting={submitting}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this ad?"
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

    </div>
  )
}

export default MyAds
