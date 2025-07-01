import React from 'react'

const ContactForm = () => {
  return (
    <div className="font-poppins shadow-xl p-5 md:p-10 rounded-xl my-7 bg-white w-full max-w-4xl mx-auto">
      <h1 className="text-center font-bold text-2xl pb-6">Contact Form</h1>
      <form
        action=""
        method="post"
        className="flex flex-col items-center justify-center gap-6 w-full"
      >
        {/* Row 1: Name & Email */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            className="border border-[#dadada] p-3 rounded-md w-full"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            className="border border-[#dadada] p-3 rounded-md w-full"
          />
        </div>

        {/* Row 2: Phone & Subject */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Your Phone Number"
            className="border border-[#dadada] p-3 rounded-md w-full"
          />
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className="border border-[#dadada] p-3 rounded-md w-full"
          />
        </div>

        {/* Message Textarea */}
        <div className="w-full">
          <textarea
            name="message"
            id="message"
            placeholder="Your Message"
            rows={5}
            className="border border-[#dadada] p-3 rounded-md w-full"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="text-white hover:text-[#0949A3] bg-[#0949A3] hover:bg-white border border-[#0949A3] py-2 px-6 rounded-md transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
