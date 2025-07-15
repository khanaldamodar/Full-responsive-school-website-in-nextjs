'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function About() {
  const [description, setDescription] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const schoolId = 2 // or fetch from config if dynamic

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/school-information/${schoolId}`)
        setDescription(res.data?.data.description || '')
        console.log(res.data.data.description)
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
      <div className="mx-4 md:mx-40 my-10">
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
