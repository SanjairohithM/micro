"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { products } from "@/components/services"
import ProductViewer3D from "@/components/products"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<(typeof products)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Find the product by ID
    const productId = Number.parseInt(params.id)
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
      setIsLoading(false)
    } else {
      // Product not found, redirect back to home
      router.push("/")
    }
  }, [params.id, router])

  // Animate content when loaded
  useEffect(() => {
    if (!isLoading && product) {
      // Animate product details
      gsap.from(".product-details", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      })

      // Animate 3D container
      gsap.from(".product-3d-container", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.out",
      })
    }
  }, [isLoading, product])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-300 hover:text-white"
            onClick={() => router.push("/")}
          >
            <ArrowLeft size={18} />
            Back to Products
          </Button>

          <h1 className="text-xl font-bold hidden md:block">{product.name}</h1>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Product Viewer */}
          <div className="product-3d-container bg-gray-900 rounded-xl overflow-hidden" style={{ height: "500px" }}>
            <ProductViewer3D productType={product.type} productColor={product.color} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="product-details">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-400 mb-4">{product.description}</p>
            </div>

            <div className="product-details space-y-4">
              <h2 className="text-xl font-semibold">Product Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>High-quality construction for durability</li>
                <li>Ergonomic design for comfortable use</li>
                <li>Premium materials for long-lasting performance</li>
                <li>Precision engineered for professional results</li>
                <li>Backed by our 5-year warranty</li>
              </ul>
            </div>

            <div className="product-details pt-4 border-t border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-400 text-sm">Material</h3>
                  <p>Premium Alloy</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Weight</h3>
                  <p>1.2 kg</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Dimensions</h3>
                  <p>24 x 8 x 4 cm</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Warranty</h3>
                  <p>5 Years</p>
                </div>
              </div>
            </div>

            <div className="product-details pt-6 mt-6 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
