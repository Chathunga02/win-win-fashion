import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Edit, Trash2, Plus, X, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    itemCode: '',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    sizes: '',
    colors: ''
  });

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  };

  const fetchOrders = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load orders", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
      return;
    }

    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    let finalImageUrl = formData.imageUrl;
    
    if (imageFile) {
      const imgData = new FormData();
      imgData.append('image', imageFile);
      try {
        const uploadRes = await fetch('http://localhost:8080/api/upload', {
          method: 'POST',
          body: imgData
        });
        const uploadJson = await uploadRes.json();
        if (uploadJson.url) {
          finalImageUrl = uploadJson.url;
        }
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }

    const isEditing = !!currentProduct;
    const url = isEditing 
      ? `http://localhost:8080/api/products/${currentProduct.id}` 
      : `http://localhost:8080/api/products`;
    const method = isEditing ? 'PUT' : 'POST';

    const productPayload = {
      ...formData,
      imageUrl: finalImageUrl,
      price: parseFloat(formData.price),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean)
    };

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productPayload)
    })
      .then(res => res.json())
      .then(data => {
        setShowProductModal(false);
        setImageFile(null);
        fetchProducts();
      })
      .catch(err => console.error("Error saving product:", err));
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE'
      })
      .then(() => fetchProducts())
      .catch(err => console.error("Error deleting product", err));
    }
  };

  const openProductModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        itemCode: product.itemCode || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price ? product.price.toString() : '',
        imageUrl: product.imageUrl || '',
        category: product.category || '',
        sizes: product.sizes ? product.sizes.join(', ') : '',
        colors: product.colors ? product.colors.join(', ') : ''
      });
      setImageFile(null);
    } else {
      setCurrentProduct(null);
      setFormData({
        itemCode: '', name: '', description: '', price: '', imageUrl: '', category: '', sizes: '', colors: ''
      });
      setImageFile(null);
    }
    setShowProductModal(true);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => fetchOrders())
    .catch(err => console.error("Error updating status", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hidden sm:block">
              <img src="/logo.jpg" alt="Win Win Fashion" className="h-12 w-auto object-contain" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-primary mb-2">Admin Dashboard</h1>
              <p className="text-gray-500">Manage products, inventory, and incoming orders.</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 flex items-center font-bold rounded-lg transition-colors ${activeTab === 'products' ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <Package className="w-4 h-4 mr-2" />
              Products
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 flex items-center font-bold rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 flex items-center font-bold rounded-lg transition-colors bg-white text-red-600 border border-gray-200 hover:bg-red-50 hover:border-red-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Products Catalog</h2>
              <button 
                onClick={() => openProductModal()}
                className="bg-secondary text-white px-4 py-2 font-bold rounded-lg flex items-center hover:bg-accent hover:shadow-md transition-all"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading products...</td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No products found. Add one to get started.</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-lg object-cover" src={product.imageUrl || "https://via.placeholder.com/40"} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">{product.name}</div>
                              <div className="text-xs text-secondary font-bold mb-1">Code: {product.itemCode || 'N/A'}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button onClick={() => openProductModal(product)} className="text-indigo-600 hover:text-indigo-900 flex items-center">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900 flex items-center">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order Info</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items / Total</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading orders...</td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-primary">#{order.id.slice(-6).toUpperCase()}</div>
                          <div className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">{order.customerDetails?.name || 'Guest'}</div>
                          <div className="text-sm text-gray-500">{order.customerDetails?.email}</div>
                          <div className="text-sm text-gray-500">{order.customerDetails?.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900 border-b pb-2 mb-2">
                            {order.items?.reduce((acc, item) => acc + item.quantity, 0)} items Total
                          </div>
                          <ul className="text-sm text-gray-600 mb-2 space-y-1">
                            {order.items?.map((item, idx) => (
                              <li key={idx} className="flex flex-col">
                                <span className="font-semibold text-primary">{item.quantity}x {item.name}</span>
                                <span className="text-xs text-gray-400">Code: {item.itemCode || 'N/A'} | Sz: {item.selectedSize} | Col: {item.selectedColor}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="text-sm font-bold text-primary">${order.totalAmount?.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`text-sm font-bold rounded-full px-3 py-1 border-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                              order.status === 'DELIVERED' ? 'bg-green-100 text-green-800 border-green-200' : 
                              order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              order.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" aria-hidden="true" onClick={() => setShowProductModal(false)}></div>
            <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-primary">
                  {currentProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleProductSubmit} className="px-6 py-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Item Code</label>
                    <input type="text" required value={formData.itemCode} onChange={e => setFormData({...formData, itemCode: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-primary focus:border-primary sm:text-sm"></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Product Image Upload</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => setImageFile(e.target.files[0])} 
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary transition-colors" 
                    />
                    {formData.imageUrl && !imageFile && (
                      <p className="mt-2 text-xs text-gray-500">Current image provided. Uploading a new one will override it.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sizes <span className="text-xs text-gray-400">(comma separated)</span></label>
                    <input type="text" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} placeholder="S, M, L, XL" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Colors <span className="text-xs text-gray-400">(comma separated)</span></label>
                    <input type="text" value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} placeholder="Red, Blue, Green" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-bold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-primary hover:bg-secondary focus:outline-none">
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
