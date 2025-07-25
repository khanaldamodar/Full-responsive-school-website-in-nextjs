'use client';

import React, { useEffect, useState } from 'react';
import Banner from '@/components/widgets/Banner';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import axios from 'axios';
import RecentBlogs from '@/components/widgets/RecentBlogs';
import dayjs from 'dayjs';

interface Notice {
  id: number;
  title: string;
  description: string;
  notice_date: string;
  image: string | null;
}

const NoticeDetailPage = () => {
  const { slug } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const { data } = await axios.get(`${apiUrl}notices`);
        const matched = data.data.find((item: Notice) =>
          item.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '') === slug
        );
        if (matched) {
          setNotice(matched);
        } else {
          setError('Notice not found');
        }
      } catch (err: any) {
        setError('Failed to load notice: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading notice...</div>;
  if (error || !notice) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="font-poppins py-40 flex flex-col lg:flex-row items-start justify-center gap-10 max-w-7xl mx-auto px-4">
      <div className="flex-1">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-[#0949A3] text-2xl font-bold">{notice.title}</h1>
          <p className="text-gray-500 text-sm mt-2">{dayjs(notice.notice_date).format('YYYY-MM-DD')}</p>
        </div>

        {notice.image && (
          <div className="relative w-full h-64 mb-10">
            <Image
              fill
              unoptimized
              src={`${imageUrl}public/storage/${notice.image}`}
              alt={notice.title}
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <p className="text-gray-700 whitespace-pre-line">{notice.description}</p>
      </div>

      <div className="w-full lg:w-[300px]">
        <RecentBlogs />
      </div>
    </div>
  );
};

export default NoticeDetailPage;
