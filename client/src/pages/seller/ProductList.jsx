import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { categories } from '../../assets/assets';


const ProductList = () => {
    const { products, currency, axios, fetchProducts } = useAppContext()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editOfferPrice, setEditOfferPrice] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editStock, setEditStock] = useState('');
    const [editUnit, setEditUnit] = useState('count');
    const [editInStock, setEditInStock] = useState(false);

    const handleEditClick = (product) => {
        setEditId(product._id);
        setEditName(product.name);
        setEditOfferPrice(product.offerPrice);
        setEditPrice(product.price || product.offerPrice);
        setEditCategory(product.category);
        setEditStock(product.stock || 0);
        setEditUnit(product.unit || 'count');
        setEditInStock(product.inStock);
        setIsEditModalOpen(true);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/product/edit', {
                id: editId,
                name: editName,
                offerPrice: Number(editOfferPrice),
                price: Number(editPrice),
                category: editCategory,
                stock: Number(editStock),
                unit: editUnit,
                inStock: editInStock
            });

            if (data.success) {
                toast.success(data.message);
                setIsEditModalOpen(false);
                fetchProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock });
            if (data.success) {
                fetchProducts();
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">Stock</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                                <th className="px-4 py-3 font-semibold truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products.map((product) => (
                                <tr key={product._id} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-300 rounded p-2">
                                            <img src={product.image[0]} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 max-sm:hidden">{currency}{product.offerPrice}</td>
                                    <td className="px-4 py-3 font-medium">
                                        {product.stock !== undefined ? `${product.stock} ${product.unit}` : "0 number"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input onClick={() => toggleStock(product._id, !product.inStock)} checked={product.inStock} type="checkbox" className="sr-only peer" />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="p-1.5 rounded hover:bg-orange-50 transition cursor-pointer flex items-center justify-center inline-block"
                                            title="Edit Product"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-orange-500 hover:text-orange-600 transition">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Product</h3>

                        <form onSubmit={handleSaveChanges} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-name">
                                    Product Name
                                </label>
                                <input
                                    id="edit-name"
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-800"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-price">
                                        Original Price
                                    </label>
                                    <input
                                        id="edit-price"
                                        type="number"
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-800"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-offer-price">
                                        Selling Price
                                    </label>
                                    <input
                                        id="edit-offer-price"
                                        type="number"
                                        value={editOfferPrice}
                                        onChange={(e) => setEditOfferPrice(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-category">
                                        Category
                                    </label>
                                    <select
                                        id="edit-category"
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white text-gray-800"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat.path}>{cat.path}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-stock">
                                        Stock Level
                                    </label>
                                    <input
                                        id="edit-stock"
                                        type="number"
                                        value={editStock}
                                        onChange={(e) => setEditStock(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-800"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-unit">
                                        Unit
                                    </label>
                                    <select
                                        id="edit-unit"
                                        value={editUnit}
                                        onChange={(e) => setEditUnit(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white text-gray-800"
                                        required
                                    >
                                        <option value="count">count</option>
                                        <option value="grams">grams</option>
                                        <option value="kilograms">kilograms</option>
                                        <option value="litres">litres</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <span className="text-sm font-medium text-gray-700">In Stock status:</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editInStock}
                                        onChange={(e) => setEditInStock(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                                <span className="text-sm text-gray-500">{editInStock ? "Available" : "Not Available"}</span>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary-dull transition cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductList
