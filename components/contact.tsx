"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate form
    if (formRef.current && sectionRef.current) {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }

    // Animate contact info
    const contactItems = infoRef.current?.querySelectorAll(".contact-item")
    if (contactItems && contactItems.length > 0 && sectionRef.current) {
      gsap.from(contactItems, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Contact us today and let's discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form ref={formRef} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>

          <div ref={infoRef} className="space-y-8">
            <div className="contact-item flex items-start space-x-4">
              <Mail className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Email Us</h3>
                <p className="text-gray-300">info@microgroups.in</p>
                <p className="text-gray-300">support@microgroups.in</p>
              </div>
            </div>

            <div className="contact-item flex items-start space-x-4">
              <Phone className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Call Us</h3>
                <p className="text-gray-300">+91 123 456 7890</p>
                <p className="text-gray-300">+91 987 654 3210</p>
              </div>
            </div>

            <div className="contact-item flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Visit Us</h3>
                <p className="text-gray-300">
                  123 Tech Park, 4th Street,
                  <br />
                  coimbatore, tamilnadu 664611,
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
