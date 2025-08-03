'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function About() {
  const [description, setDescription] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const schoolId = 2 // or fetch from config if dynamic

  const cacheRef = useRef<Record<string, string>>({})

useEffect(() => {
  const fetchData = async () => {
    if (cacheRef.current[schoolId]) {
      setDescription(cacheRef.current[schoolId])
      setLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await axios.get(`${apiUrl}school-information/${schoolId}`)
      const desc = res.data?.data.description || ''
      cacheRef.current[schoolId] = desc
      setDescription(desc)
    } catch (err) {
      setError('Failed to load school information.')
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [schoolId])


  return (
    <div className="font-poppins">
      <div className="mx-4 lg:mx-40 my-10">
        <p className="text-[18px] text-justify">
          "<span className="text-[#0949A3] font-bold text-2xl">Our vision</span>{" "}
          - To develop this School as a deemed university by making it a center of
          academic excellence for meeting the emerging challenges of
          modernization and globalization”
        </p>

        <br />
        <br />

        {loading ? (
          <p className="text-gray-500">Loading school information...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-[18px] text-justify whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
