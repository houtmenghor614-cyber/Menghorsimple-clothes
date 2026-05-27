import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadOrders();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      loadOrders();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Format date only (no time)
  const formatCambodiaDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Phnom_Penh'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      paid: 'bg-green-500',
      shipped: 'bg-blue-500',
      delivered: 'bg-purple-500',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pending Payment',
      paid: 'Paid ✓',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'fa-clock',
      paid: 'fa-check-circle',
      shipped: 'fa-truck',
      delivered: 'fa-check-double',
      cancelled: 'fa-times-circle'
    };
    return icons[status] || 'fa-circle';
  };

  if (loading && orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-box-open text-4xl text-gray-400"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet</p>
        <Link to="/products" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with User Name */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
        <p className="text-gray-500">
          Welcome back, <span className="font-semibold text-indigo-600">{user?.full_name || 'Customer'}</span>!
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-receipt text-gray-400"></i>
                    <span className="font-mono text-sm font-semibold text-gray-700">
                      Order #{order.order_number}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} text-white`}>
                      <i className={`fas ${getStatusIcon(order.status)} text-xs`}></i>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  
                  {/* Customer Name - From their account */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                    <span>
                      <i className="fas fa-user mr-1"></i>
                      Customer: <span className="font-medium text-gray-800">{order.customer_name || user?.full_name || 'N/A'}</span>
                    </span>
                    {order.customer_phone && (
                      <span>
                        <i className="fas fa-phone mr-1"></i>
                        Phone: <span className="font-medium text-gray-800">{order.customer_phone}</span>
                      </span>
                    )}
                  </div>
                  
                  {/* Date Only (No Time) */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>
                      <i className="far fa-calendar-alt mr-1"></i>
                      Order Date: {formatCambodiaDate(order.created_at)}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    ${parseFloat(order.total_amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Order Body */}
            <div className="p-6">
              {/* Order Items Preview */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <i className="fas fa-box text-indigo-600"></i>
                  Order Items ({order.items?.length || 0})
                </h3>
                <div className="space-y-2">
                  {order.items?.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.product_main_image ? (
                            <img 
                              src={`http://127.0.0.1:8000${item.product_main_image}`} 
                              alt={item.product_title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <i className="fas fa-image text-gray-400"></i>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.product_title}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × ${item.price_at_time}
                            {item.selected_size && ` | Size: ${item.selected_size}`}
                            {item.selected_color && ` | Color: ${item.selected_color}`}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${(item.quantity * item.price_at_time).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {order.items?.length > 2 && (
                    <p className="text-xs text-gray-500">
                      + {order.items.length - 2} more item(s)
                    </p>
                  )}
                </div>
              </div>
              
              {/* Shipping Address */}
              {order.shipping_address && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    Shipping Address
                  </p>
                  <p className="text-sm text-gray-700">{order.shipping_address}</p>
                </div>
              )}
              
              {/* Order Footer */}
              <div className="border-t pt-4 mt-2 flex justify-end">
                <Link
                  to={`/orders/${order.id}`}
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
                >
                  View Order Details
                  <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;