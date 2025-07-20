'use client';

import IndividualNoticeCard from "@/components/otherComponents/IndividualNoticeCard";
import Banner from "@/components/widgets/Banner";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

// Type definition for each notice
interface Notice {
  id: number;
  title: string;
  description: string;
  notice_date: string;
  image: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

// API response type
interface NoticeApiResponse {
  status: boolean;
  data: Notice[];
}

const NoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const result = await axios.get<NoticeApiResponse>("http://localhost:8000/api/notices");

        if (result.data.status && result.data.data) {
          setNotices(result.data.data);
        } else {
          setError("Failed to fetch notices");
        }
      } catch (err: any) {
        setError("Error fetching notices: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading || error) {
    return (
      <div className="py-10 font-poppins">
        <Banner title="Notices" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center">Loading notices...</div>
          ) : (
            <div className="text-center text-red-500">{error}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 font-poppins">
      <Banner title="Notices" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <IndividualNoticeCard
                key={notice.id}
                title={notice.title}
                date={dayjs(notice.notice_date).format("YYYY-MM-DD")}
                description={notice.description}
                image={notice.image ? `http://localhost:8000/storage/${notice.image}` : undefined}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">No notices available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;
