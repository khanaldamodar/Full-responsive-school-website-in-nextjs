import React from 'react'

const Map = () => {
  return (
    <div className="font-poppins shadow-xl rounded-xl my-7 w-full max-w-6xl mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.847263514341!2d85.29238057525322!3d27.69111517619183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb194ba1ae7f99%3A0x9cfc3b6f8a3da72!2sShakta%20Technology!5e0!3m2!1sen!2snp!4v1751364300629!5m2!1sen!2snp"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-xl"
      ></iframe>
    </div>
  )
}

export default Map
