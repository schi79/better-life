import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Calendar, Shield, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { products } from '../data/mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductCOA = ({ cartItems, onCartClick }) => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header cartItems={cartItems} onCartClick={onCartClick} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">COA Not Found</h1>
          <Link to="/shop" className="text-emerald-600 hover:text-emerald-700">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock COA data
  const coaData = {
    labName: "Green Scientific Labs",
    testDate: "2025-01-20",
    sampleDate: "2025-01-18",
    batchNumber: `BL-${product.id}-2025`,
    certNumber: `COA-${product.id}-20250120`,
    cannabinoids: [
      { compound: 'THCa', percentage: product.thca || '25.8%', mg_g: '258.0 mg/g' },
      { compound: 'Delta-9 THC', percentage: '0.12%', mg_g: '1.2 mg/g' },
      { compound: 'CBDa', percentage: '0.8%', mg_g: '8.0 mg/g' },
      { compound: 'CBD', percentage: '0.05%', mg_g: '0.5 mg/g' },
      { compound: 'CBG', percentage: '1.2%', mg_g: '12.0 mg/g' },
      { compound: 'CBN', percentage: '0.1%', mg_g: '1.0 mg/g' }
    ],
    terpenes: [
      { compound: 'Myrcene', percentage: '0.65%' },
      { compound: 'Limonene', percentage: '0.42%' },
      { compound: 'Caryophyllene', percentage: '0.38%' },
      { compound: 'Linalool', percentage: '0.21%' },
      { compound: 'Pinene', percentage: '0.18%' }
    ],
    contaminants: {
      pesticides: 'None Detected',
      residualSolvents: 'None Detected',
      heavyMetals: 'Within Safe Limits',
      microbials: 'Pass',
      moisture: '8.2%'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItems={cartItems} onCartClick={onCartClick} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to={`/product/${product.slug}`}
              className="flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Product
            </Link>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Certificate of Analysis (COA)
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">{product.name}</h2>
            <div className="flex justify-center items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Lab Verified
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <FileText className="h-3 w-3 mr-1" />
                Third-Party Tested
              </Badge>
            </div>
          </div>
        </div>

        {/* COA Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Product Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Name:</span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Type:</span>
                  <span className="font-medium">{product.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Batch Number:</span>
                  <span className="font-medium">{coaData.batchNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sample Date:</span>
                  <span className="font-medium">{coaData.sampleDate}</span>
                </div>
              </div>
            </div>

            {/* Lab Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lab Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Laboratory:</span>
                  <span className="font-medium">{coaData.labName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Test Date:</span>
                  <span className="font-medium">{coaData.testDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate #:</span>
                  <span className="font-medium">{coaData.certNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">Passed</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Cannabinoids */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cannabinoid Profile</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Compound</th>
                    <th className="text-left py-2">Percentage (%)</th>
                    <th className="text-left py-2">mg/g</th>
                  </tr>
                </thead>
                <tbody>
                  {coaData.cannabinoids.map((cannabinoid, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-medium">{cannabinoid.compound}</td>
                      <td className="py-2">
                        <span className={`font-semibold ${
                          cannabinoid.compound === 'THCa' ? 'text-emerald-600' : 'text-gray-800'
                        }`}>
                          {cannabinoid.percentage}
                        </span>
                      </td>
                      <td className="py-2 text-gray-600">{cannabinoid.mg_g}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Terpenes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Terpene Profile</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Terpene</th>
                    <th className="text-left py-2">Percentage (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {coaData.terpenes.map((terpene, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-medium">{terpene.compound}</td>
                      <td className="py-2 text-gray-800">{terpene.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Contaminants */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contaminant Testing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pesticides:</span>
                  <span className="font-medium text-green-600">{coaData.contaminants.pesticides}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Residual Solvents:</span>
                  <span className="font-medium text-green-600">{coaData.contaminants.residualSolvents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heavy Metals:</span>
                  <span className="font-medium text-green-600">{coaData.contaminants.heavyMetals}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Microbials:</span>
                  <span className="font-medium text-green-600">{coaData.contaminants.microbials}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Moisture Content:</span>
                  <span className="font-medium">{coaData.contaminants.moisture}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Legal Disclaimer</h4>
            <p className="text-sm text-gray-600">
              This product has been tested by a third-party laboratory. Results are based on the sample submitted 
              and may not represent the entire batch. This product has not been evaluated by the FDA and is not 
              intended to diagnose, treat, cure, or prevent any disease. Keep out of reach of children and pets.
            </p>
          </div>
        </div>

        {/* Back to Product */}
        <div className="text-center">
          <Link
            to={`/product/${product.slug}`}
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {product.name}
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductCOA;