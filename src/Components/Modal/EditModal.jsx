import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import close from '../../assets/close.svg'
import fileUpload from '../../assets/fileUpload.svg'
import loading from '../../assets/loading.gif'

const EditModal = ({
  toggleModalEdit,
  status,
  product,
  setProduct,
  handleEditSubmit,
  handleImageUpload,
  image,
  setImage,
  submitting,
}) => {
  return (
    <Transition appear show={status} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleModalEdit}>
        <div className="min-h-screen px-4 text-center">
          <span className="inline-block h-screen align-middle" aria-hidden="true">​</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative w-full max-w-md p-4 inline-block align-middle transform bg-white shadow-xl rounded-lg">
              {/* Close */}
              <img
                onClick={() => {
                  toggleModalEdit()
                  setImage(null)
                }}
                className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
                src={close}
                alt=""
              />

              <div className="p-6">
                <p className="font-bold text-lg mb-3">Edit Product</p>

                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={product.title || ''}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={product.category || ''}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={product.price || ''}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={product.description || ''}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="border p-2 rounded w-full mb-2"
                  />

                  <div className="pt-2 w-full relative">
                    {image || product.imageUrl ? (
                      <div className="relative h-40 w-full flex justify-center border-2 border-black rounded-md overflow-hidden">
                        <img
                          className="object-contain"
                          src={image ? URL.createObjectURL(image) : product.imageUrl}
                          alt=""
                        />
                        <input
                          onChange={handleImageUpload}
                          type="file"
                          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="relative h-40 w-full border-2 border-black rounded-md flex flex-col justify-center items-center">
                        <input
                          onChange={handleImageUpload}
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer z-30"
                        />
                        <img className="w-12" src={fileUpload} alt="" />
                        <p className="text-center text-sm pt-2">Click to upload image</p>
                      </div>
                    )}
                  </div>

                  {submitting ? (
                    <div className="w-full flex justify-center pt-4">
                      <img className="w-32 object-cover" src={loading} alt="" />
                    </div>
                  ) : (
                    <div className="w-full pt-4">
                      <button
                        className="w-full p-3 rounded-lg text-white"
                        style={{ backgroundColor: '#002f34' }}
                      >
                        Update Product
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditModal
