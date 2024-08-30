import React from 'react';

export default function ReturnsAndExchanges() {
  return (
    <div className="bg-glass py-6 rounded-lg my-32 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Returns & Exchanges</h2>

        {/* Policy Introduction */}
        <div className="mb-8">
          <p className="text-lg text-gray-600">
            We want you to be completely satisfied with your purchase. If you are not happy with your order for any reason, you may return or exchange it within 30 days of the purchase date, provided it meets our return policy conditions.
          </p>
        </div>

        {/* Return Policy Section */}
        <div className="bg-glass e p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Return Policy</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">Items must be returned in their original condition, unworn, unwashed, and with all tags attached.</li>
            <li className="mb-2">Returns must be made within 30 days of the purchase date.</li>
            <li className="mb-2">Original shipping charges are non-refundable unless the return is due to our error.</li>
            <li className="mb-2">Sale items or special order products are not eligible for return or exchange.</li>
          </ul>
        </div>

        {/* Exchange Policy Section */}
        <div className="bg-glass p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Exchange Policy</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">Exchanges can be made within 30 days of the purchase date.</li>
            <li className="mb-2">Items must be in their original condition, unworn, unwashed, and with all tags attached.</li>
            <li className="mb-2">Please contact customer service to initiate an exchange and receive a prepaid return label.</li>
          </ul>
        </div>

        {/* How to Return or Exchange Items */}
        <div className="bg-glass p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">How to Return or Exchange Items</h3>
          <p className="text-gray-600 mb-4">To return or exchange an item, please follow these steps:</p>
          <ol className="list-decimal list-inside text-gray-600 mb-4">
            <li className="mb-2">Contact our customer service team at <a href="mailto:support@ecommerce.com" className="text-blue-600 hover:underline">support@ecommerce.com</a> to request a return or exchange authorization.</li>
            <li className="mb-2">Pack the item securely in its original packaging (if possible) and include your receipt or proof of purchase.</li>
            <li className="mb-2">Attach the prepaid return label provided by our customer service team to the outside of your package.</li>
            <li className="mb-2">Drop off the package at your nearest courier location or schedule a pickup.</li>
          </ol>
          <p className="text-gray-600">
            Once we receive your returned item, we will inspect it and process your return or exchange. Please allow 5-7 business days for the refund to appear on your original payment method.
          </p>
        </div>
      </div>
    </div>
  );
}
